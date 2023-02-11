import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get-decorator';
import { JwtAuthGurad } from 'src/auth/guards/jwt-auth.guard';
import { Item } from 'src/entities/item.entity';
import { User } from 'src/entities/user.entity';
import { CreatItemDto } from './dto/creat-item.dto';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @Get()
    async findAll() :Promise<Item[]> {
        return await this.itemsService.findAll();
    }

    @Get(':id')
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
        return await this.itemsService.findById(id);
    }

    @Post()
    @UseGuards(JwtAuthGurad)
    async creat(
        @Body() creatItemDto: CreatItemDto,
        @GetUser() user: User
    ): Promise<Item> {
        return await this.itemsService.creat(creatItemDto, user);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGurad)
    async updateStatus (@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
        return await this.itemsService.updateStatus(id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGurad)
    async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return await this.itemsService.delete(id);
    }
}
