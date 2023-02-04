import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { Item } from 'src/entities/item.entity';
import { CreatItemDto } from './dto/creat-item.dto';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @Get()
    findAll(): Item[] {
        return this.itemsService.findAll();
    }

    @Get(':id')
    findById(@Param('id', ParseUUIDPipe) id: string): Item {
        return this.itemsService.findById(id);
    }

    @Post()
    async creat(@Body() creatItemDto: CreatItemDto): Promise<Item> {
        return await this.itemsService.creat(creatItemDto);
    }

    @Patch(':id')
    updateStatus (@Param('id', ParseUUIDPipe) id: string): Item {
        return this.itemsService.updateStatus(id);
    }

    @Delete(':id')
    delete(@Param('id', ParseUUIDPipe) id: string): void {
        return this.itemsService.delete(id);
    }
}
