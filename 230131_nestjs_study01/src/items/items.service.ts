import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemStatus } from './item-status.enum';
import { Item } from './item.model';
import { v4 as uuid } from 'uuid';
import { CreatItemDto } from './dto/creat-item.dto';

@Injectable()
export class ItemsService {
    private items : Item[] = [];
    findAll(): Item[] {
        return this.items;
    }

    findById(id: string): Item {
        const found = this.items.find( item => item.id === id );
        if (!found) {
            throw new NotFoundException({
                "statusCode": 404,
                "message": "商品が見つかりませんでした"
            });
        }
        return found;
    }

    creat(creatItemDto: CreatItemDto): Item {
        const item: Item = {
            id: uuid(),
            ...creatItemDto,
            status: ItemStatus.ON_SALE
        }
        this.items.push(item);
        return item;
    }

    updateStatus(id: string): Item {
        const item = this.findById(id);
        item.status = 
            item.status === ItemStatus.ON_SALE ?
            ItemStatus.SOLD_OUT:
            ItemStatus.ON_SALE;
        return item;
    }

    delete(id: string): void {
        this.items = this.items.filter( item => item.id !== id );
    }
}