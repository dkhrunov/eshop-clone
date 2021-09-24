import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { OrderApiService } from './order-api.service';
import {
  CreateOrderDto,
  OrderEntity,
  UpdateOrderStatus,
} from '@esc/order/models';
import { GetUser } from '@esc/user/api';
import { DeleteResult } from 'typeorm';
import { CountResponse } from '@esc/shared/util-models';
@Controller('orders')
export class OrderApiController {
  constructor(private orderApiService: OrderApiService) {}

  @Post()
  createOrder(
    @Body() dto: CreateOrderDto,
    @GetUser('id') id: string
  ): Promise<OrderEntity> {
    return this.orderApiService.createOrder(dto, id);
  }

  @Get()
  getAllOrders(): Promise<OrderEntity[]> {
    return this.orderApiService.getAllOrders();
  }

  @Get('totalsales')
  totalSales(): Promise<CountResponse> {
    return this.orderApiService.getTotalSales();
  }

  @Get('count')
  orderCount(): Promise<CountResponse> {
    return this.orderApiService.getOrderCount();
  }

  @Get('user/:id')
  userOrders(@Param('id') id: string): Promise<OrderEntity[]> {
    return this.orderApiService.getUserOrders(id);
  }

  @Get(':id')
  getOrderById(@Param('id', ParseUUIDPipe) id: string): Promise<OrderEntity> {
    return this.orderApiService.getOrderById(id);
  }

  @Put(':id')
  updateOrderStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() { status }: UpdateOrderStatus
  ): Promise<OrderEntity> {
    return this.orderApiService.updateOrderStatus(id, status);
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: string): Promise<DeleteResult> {
    return this.orderApiService.deleteOrder(id);
  }
}
