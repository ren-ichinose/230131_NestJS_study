import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CreatItemDto } from './dto/creat-item.dto';
import { Item } from '../entities/item.entity';
import { ItemsService } from './items.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('items')
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
    async creat(@Body() creatItemDto: CreatItemDto): Promise<Item> {
        return await this.itemsService.creat(creatItemDto);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async updateStatus(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
        return await this.itemsService.updateStatus(id);
    }

    @Delete(':id') 
    @UseGuards(JwtAuthGuard)
    async delet(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return await this.itemsService.delete(id);
    }
}
