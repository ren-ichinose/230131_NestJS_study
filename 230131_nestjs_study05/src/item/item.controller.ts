import { Body, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get-decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Item } from 'src/entities/item.entity';
import { User } from 'src/entities/user.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createItem(
    @Body() createItemDto: CreateItemDto,
    @GetUser() user: User,
  ): Promise<Item> {
    return await this.itemService.createItem(createItemDto, user);
  }
}
