import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ItemStatus } from './item-status.enum';
import { Item } from './item.model';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService){}
    @Get()
    findAll(): Item[] {
        return this.itemsService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string){
        return this.itemsService.findById(id);
    }

    @Post()
    creat(
        @Body('id') id: string,
        @Body('name') name: string,
        @Body('price') price: number,
        @Body('description') description: string
    ): Item {
    const item = {
        id,
        name,
        price,
        description,
        status: ItemStatus.ON_SALE
    }
    return this.itemsService.creat(item);
    }

    @Patch(':id')
    updateStatus(@Param('id') id: string): Item {
        return this.itemsService.updateStatus(id);
    }

    @Delete(':id') 
    delet(@Param('id') id: string): void {
        return this.itemsService.delete(id);
    }
}
