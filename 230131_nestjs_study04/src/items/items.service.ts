import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Item } from 'src/entities/item.entity';
import { User } from 'src/entities/user.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemStatus } from './item-status.enum';
import { ItemRepository } from './item.repository';

@Injectable()
export class ItemsService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  async findById(id: string): Promise<Item> {
    const item = await this.itemRepository.findOne(id);
    if (!item) {
      throw new NotFoundException({
        statusCode: 404,
        message: '商品が見つかりませんでした',
      });
    }
    return item;
  }

  async createItem(createItemDto: CreateItemDto, user: User): Promise<Item> {
    return await this.itemRepository.createItem(createItemDto, user);
  }

  async updateStatus(id: string, user: User): Promise<Item> {
    const item = await this.findById(id);
    if (item.userId === user.id) {
      throw new BadRequestException('この商品の購入はできません');
    }
    // item.status = ItemStatus.SOLD_OUT;
    // item.updatedAt = new Date().toISOString();
    const updateStatusItem = {
      ...item,
      status: ItemStatus.SOLD_OUT,
      updatedAt: new Date().toISOString(),
    };
    await this.itemRepository.save(updateStatusItem);
    return updateStatusItem;
  }

  async deleteItem(id: string, user: User): Promise<void> {
    const item = await this.findById(id);
    if (item.userId !== user.id) {
      throw new BadRequestException('この商品の削除はできません');
    }
    await this.itemRepository.delete({ id })
  }
}
