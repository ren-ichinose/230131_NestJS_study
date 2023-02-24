import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { Role } from 'src/auth/decorator/role.decorator';
import { JwtAuthGurd } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserStatus } from 'src/auth/user-status.enum';
import { Item } from 'src/entities/item.entity';
import { User } from 'src/entities/user.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';

@Controller('items')
@UseInterceptors(ClassSerializerInterceptor)
export class ItemsController {
  constructor(private readonly itemService: ItemsService) {}

  @Get()
  async findAll(): Promise<Item[]> {
    return await this.itemService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
    return await this.itemService.findById(id);
  }

  @Post()
  @Role(UserStatus.PREMIUM)
  @UseGuards(JwtAuthGurd, RolesGuard)
  async createItem(
    @Body() createItemDto: CreateItemDto,
    @GetUser() user: User,
  ): Promise<Item> {
    return await this.itemService.createItem(createItemDto, user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGurd)
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<Item> {
    return this.itemService.updateStatus(id, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGurd)
  async deleteItem(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<void> {
    await this.itemService.deleteItem(id, user);
  }
}
