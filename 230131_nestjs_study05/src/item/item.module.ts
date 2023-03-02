import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ItemController } from './item.controller';
import { ItemRepository } from './item.repository';
import { ItemService } from './item.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([ItemRepository])],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
