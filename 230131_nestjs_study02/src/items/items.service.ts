import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatItemDto } from './dto/creat-item.dto';
import { ItemStatus } from './item-status.enum';
import { Item } from '../entities/item.entity';
import { ItemRepository } from './imte.repository';

@Injectable()
export class ItemsService {
    constructor(private readonly itemrepository: ItemRepository){}

    private items: Item[] = [];

    findAll(): Item[]{
        return this.items;
    }

    findById(id: string): Item {
        const found = this.items.find( item => item.id === id );
        if(!found) {
            throw new NotFoundException({
                "statusCode": 404,
                "message": "商品が見つかりませんでした"
            });
        }
        return found;
    }
    async creat(creatItemDto: CreatItemDto): Promise<Item>{
        return this.itemrepository.creatItem(creatItemDto);
    }

    updateStatus(id: string): Item {
        const item = this.findById(id);
        item.status = 
            item.status === ItemStatus.ON_SALE ?
            ItemStatus.SOLD_OUT :
            ItemStatus.ON_SALE;
        return item;
    }

    delete(id: string): void {
        this.items = this.items.filter( item => item.id !== id );
    }
}
