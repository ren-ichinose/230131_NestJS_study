import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemStatus } from './item-status.enum';
import { Item } from '../entities/item.entity';
import { CreatItemDto } from './dto/creat-item.dto';
import { ItemRepository } from './item.repository';
import { User } from 'src/entities/user.entity';

@Injectable()
export class ItemsService {
    constructor(private readonly itemRepository: ItemRepository) {}
    
    async findAll(): Promise<Item[]> {
        return await this.itemRepository.find();
    }

    async findById(id: string): Promise<Item> {
        const found = await this.itemRepository.findOne(id);
        if (!found) {
            throw new NotFoundException({
                "statusCode": 404,
                "message": "商品が見つかりませんでした"
            });
        }
        return found;
    }

    async create(creatItemDto: CreatItemDto, user:User): Promise<Item> {
        return await this.itemRepository.createItem(creatItemDto, user);
    }

    async updateStatus(id: string): Promise<Item> {
        const item = await this.findById(id);
        item.status = 
            item.status === ItemStatus.ON_SALE ?
            ItemStatus.SOLD_OUT:
            ItemStatus.ON_SALE;
        item.updatedAt = new Date().toISOString();
        await this.itemRepository.save(item);
        return item;
    }

    async delete(id: string): Promise<void> {
        await this.itemRepository.delete(id);
    }
}