import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
  imports: [AuthModule],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
