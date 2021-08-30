import { CreateOrderDto, OrderEntity } from '@esc/order/models';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderApiService {
  async createOrder(dto: CreateOrderDto): Promise<OrderEntity> {
    return new Promise(() => {
      return dto;
    });
  }
}
