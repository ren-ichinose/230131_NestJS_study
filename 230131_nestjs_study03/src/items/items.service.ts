import { Injectable } from '@nestjs/common';
import { CreatItemDto } from './dto/creat-item.dto';
import { ItemStatus } from './item-status.enum';
import { Item } from './item.model';

@Injectable()
export class ItemsService {
    private items: Item[] = [];
    
    findAll(){
        return this.items;
    }

    findById(id: string): Item {
        return this.items.find( item => item.id === id );
    }

    creat(creatItemDto: CreatItemDto): Item {
        const item = {
            ...creatItemDto,
            status: ItemStatus.ON_SALE,
        }
        this.items.push(item);
        return item;
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
