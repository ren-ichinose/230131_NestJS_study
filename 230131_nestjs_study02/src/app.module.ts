import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ItemsModule,
    TypeOrmModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
