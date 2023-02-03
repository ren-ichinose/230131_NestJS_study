import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreatItemDto } from './dto/creat-item.dto';
import { Item } from './item.model';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}    
    @Get()
    findAll(): Item[] {
        return this.itemsService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string): Item {
        return this.itemsService.findById(id);
    }

    @Post()
    creat(@Body() creatItemDto: CreatItemDto): Item {
        return this.itemsService.creat(creatItemDto);
    }

    @Patch(':id')
    update(@Param('id') id: string): Item {
        return this.itemsService.updateStatus(id);
    }

    @Delete(':id')
    delete(@Param('id') id: string): void {
        return this.itemsService.delete(id);
    }

}
