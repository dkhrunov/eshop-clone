import { Controller } from '@nestjs/common';
import { ProductApiService } from './product-api.service';

@Controller('product-api')
export class ProductApiController {
  constructor(private productApiService: ProductApiService) {}
}
