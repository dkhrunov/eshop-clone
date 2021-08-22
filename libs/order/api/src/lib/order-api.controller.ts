import { Controller } from '@nestjs/common';
import { OrderApiService } from './order-api.service';

@Controller('order-api')
export class OrderApiController {
  constructor(private orderApiService: OrderApiService) {}
}
