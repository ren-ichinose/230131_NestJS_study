import { Injectable } from '@nestjs/common';
import { Item } from 'src/entities/item.entity';
import { User } from 'src/entities/user.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemRepository } from './item.repository';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}

  createItem(createItemDto: CreateItemDto, user: User): Promise<Item> {
    return this.itemRepository.createItem(createItemDto, user);
  }
}
