import { ProductEntity } from '@esc/product/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductApiController } from './product-api.controller';
import { ProductApiService } from './product-api.service';

@Module({
  controllers: [ProductApiController],
  providers: [ProductApiService],
  exports: [ProductApiService],
  imports: [TypeOrmModule.forFeature([ProductEntity])],
})
export class ProductApiModule {}
