import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CredentialsDto } from './dto/credentials.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(createUserDto);
  }

  async signIn(
    credentialsDto: CredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = credentialsDto;
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      throw new UnauthorizedException(
        'ユーザー名またはパスワードを確認してください',
      );
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException(
        'ユーザー名またはパスワードを確認してください',
      );
    }
    return await this.generateJwt(user.id, user.username);
  }

  async generateJwt(
    id: string,
    username: string,
  ): Promise<{ accessToken: string }> {
    const payload = { id, username };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
}
