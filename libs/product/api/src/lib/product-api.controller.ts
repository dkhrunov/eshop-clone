import { Controller, Get } from '@nestjs/common';
import { ProductApiService } from './product-api.service';

@Controller('products')
export class ProductApiController {
  constructor(private productApiService: ProductApiService) {}

  @Get()
  getProducts() {
    const product = {
      id: 1,
      name: 'Product 1',
    };
    return product;
  }
}
