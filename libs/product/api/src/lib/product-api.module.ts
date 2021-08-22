import { Module } from '@nestjs/common';
import { ProductApiController } from './product-api.controller';
import { ProductApiService } from './product-api.service';

@Module({
  controllers: [ProductApiController],
  providers: [ProductApiService],
  exports: [ProductApiService],
})
export class ProductApiModule {}
