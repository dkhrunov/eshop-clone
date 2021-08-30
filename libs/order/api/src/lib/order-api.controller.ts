import { Body, Controller, Post } from '@nestjs/common';
import { OrderApiService } from './order-api.service';
import { CreateOrderDto, OrderEntity } from '@esc/order/models';

@Controller('orders')
export class OrderApiController {
  constructor(private orderApiService: OrderApiService) {}

  @Post()
  createOrder(@Body() dto: CreateOrderDto): Promise<OrderEntity> {
    return this.orderApiService.createOrder(dto);
  }
}
