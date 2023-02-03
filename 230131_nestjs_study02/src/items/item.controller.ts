import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CreatItemDto } from './dto/creat-item.dto';
import { Item } from './items.model';
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
    creat(@Body() creatItemDto: CreatItemDto): Item {
        return this.itemsService.creat(creatItemDto);
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
