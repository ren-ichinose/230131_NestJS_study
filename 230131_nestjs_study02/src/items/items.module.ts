import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemRepository } from './imte.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemRepository]),
    AuthModule
  ],
  providers: [ItemsService],
  controllers: [ItemsController]
})
export class ItemsModule {}
