import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemRepository } from './imte.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ItemRepository])],
  providers: [ItemsService],
  controllers: [ItemsController]
})
export class ItemsModule {}
