import { CategoryEntity, ProductEntity } from '@esc/product/models';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './category-api.service';
import { ProductApiController } from './product-api.controller';
import { ProductApiService } from './product-api.service';

@Module({
  controllers: [ProductApiController],
  providers: [ProductApiService, CategoryService],
  exports: [ProductApiService],
  imports: [TypeOrmModule.forFeature([CategoryEntity, ProductEntity])],
})
export class ProductApiModule {}
