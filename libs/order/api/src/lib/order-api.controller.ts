import { Controller } from '@nestjs/common';
import { OrderApiService } from './order-api.service';

@Controller('orders')
export class OrderApiController {
  constructor(private orderApiService: OrderApiService) {}
}
