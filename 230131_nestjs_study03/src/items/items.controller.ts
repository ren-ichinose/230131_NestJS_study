import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreatItemDto } from './dto/creat-item.dto';
import { Item } from '../entities/item.entity';
import { ItemsService } from './items.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorator/get-decorator';
import { User } from 'src/entities/user.entity';

@Controller('items')
@UseInterceptors(ClassSerializerInterceptor)
export class ItemsController {
    constructor(private readonly itemsService: ItemsService){}
    @Get()
    async findAll(): Promise<Item[]> {
        return await this.itemsService.findAll();
    }

    @Get(':id')
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
        return await this.itemsService.findById(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async creat(
        @Body() creatItemDto: CreatItemDto,
        @GetUser() user: User
    ): Promise<Item> {
        return await this.itemsService.creat(creatItemDto, user);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async updateStatus(
        @Param('id', ParseUUIDPipe) id: string,
        @GetUser() user: User
    ): Promise<Item> {
        return await this.itemsService.updateStatus(id, user);
    }

    @Delete(':id') 
    @UseGuards(JwtAuthGuard)
    async delet(
        @Param('id', ParseUUIDPipe) id: string,
        @GetUser() user: User
    ): Promise<void> {
        return await this.itemsService.delete(id, user);
    }
}
