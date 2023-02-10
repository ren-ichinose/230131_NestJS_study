import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreatItemDto } from './dto/creat-item.dto';
import { Item } from '../entities/item.entity';
import { ItemsService } from './items.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorator/get-decorator';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/auth/decorator/role.decorator';
import { UserStatus } from 'src/auth/user-status.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('items')
@UseInterceptors(ClassSerializerInterceptor)
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}    
    @Get()
    async findAll(): Promise<Item[]> {
        return await this.itemsService.findAll();
    }

    @Get(':id')
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
        return await this.itemsService.findById(id);
    }

    @Post()
    @Role(UserStatus.PREMIUM)
    @UseGuards(JwtAuthGuard,RolesGuard)
    async create(@Body() creatItemDto: CreatItemDto, @GetUser() user: User): Promise<Item> {
        return await this.itemsService.create(creatItemDto, user);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async update(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: User): Promise<Item> {
        return await this.itemsService.updateStatus(id, user);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async delete(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: User): Promise<void> {
        return await this.itemsService.delete(id, user);
    }

}
