import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CreatItemDto } from './dto/creat-item.dto';
import { Item } from '../entities/item.entity';
import { ItemsService } from './items.service';

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
    async creat(@Body() creatItemDto: CreatItemDto): Promise<Item> {
        return await this.itemsService.creat(creatItemDto);
    }

    @Patch(':id')
    async updateStatus(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
        return await this.itemsService.updateStatus(id);
    }

    @Delete(':id') 
    async delet(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return await this.itemsService.delete(id);
    }
}
