import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductApiService } from './product-api.service';
import { CreateProductDto, ProductEntity } from '@esc/product/entities';

@Controller('products')
export class ProductApiController {
  constructor(private productApiService: ProductApiService) {}

  @Get()
  getProducts(): Promise<ProductEntity[]> {
    return this.productApiService.getProducts();
  }

  @Post()
  createProduct(@Body() dto: CreateProductDto): Promise<ProductEntity> {
    return this.productApiService.createProduct(dto);
  }
}
