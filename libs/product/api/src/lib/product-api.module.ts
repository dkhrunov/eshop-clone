import { CategoryEntity, ProductEntity } from '@esc/product/models';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { CategoryService } from './category-api.service';
import { ProductApiController } from './product-api.controller';
import { ProductApiService } from './product-api.service';
import { UploadImagesController } from './upload-images.controller';

@Module({
  controllers: [ProductApiController, UploadImagesController],
  providers: [ProductApiService, CategoryService],
  exports: [ProductApiService],
  imports: [
    TypeOrmModule.forFeature([CategoryEntity, ProductEntity]),
    NestjsFormDataModule,
  ],
})
export class ProductApiModule {}
