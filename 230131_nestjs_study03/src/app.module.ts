import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ItemsModule,
    TypeOrmModule.forRoot(),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}