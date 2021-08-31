import {
  CreateOrderDto,
  OrderEntity,
  OrderItemEntity,
} from '@esc/order/models';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Any, DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '@esc/product/models';
import { CountResponse } from '@esc/shared/util-models';

@Injectable()
export class OrderApiService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(OrderItemEntity)
    private readonly itemRepository: Repository<OrderItemEntity>
  ) {}

  async createOrder(dto: CreateOrderDto, userId: string) {
    const newOrder = this.orderRepository.create(dto);
    newOrder.user = userId;
    newOrder.totalPrice = 0;

    for (const item of newOrder.orderItems) {
      const product = await this.productRepository.findOne(item.id);

      if (!product) {
        throw new NotFoundException();
      }

      newOrder.totalPrice += product.price * item.quantity;

      await this.itemRepository.save(item);
    }

    const savedOrder = await this.orderRepository.save(newOrder);

    return savedOrder;
  }

  async getAllOrders(): Promise<OrderEntity[]> {
    const orders = await this.orderRepository.find({});

    return orders;
  }

  async getOrderById(id: string): Promise<OrderEntity> {
    const order = await this.orderRepository.findOne(id);

    if (!order) {
      throw new NotFoundException();
    }

    return order;
  }

  async updateOrderStatus(id: string, status: string): Promise<OrderEntity> {
    const order = await this.orderRepository.findOne(id);

    if (!order) {
      throw new NotFoundException();
    }

    order.status = status;

    const updatedOrder = await this.orderRepository.save(order);

    return updatedOrder;
  }

  async deleteOrder(id: string): Promise<DeleteResult> {
    const result = await this.orderRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException();
    }

    return result;
  }

  async getTotalSales(): Promise<CountResponse> {
    const { total_sales } = await this.orderRepository
      .createQueryBuilder('order')
      .select('SUM("totalPrice")', 'total_sales')
      .getRawOne();

    return {
      total_sales: parseInt(total_sales),
    };
  }

  async getOrderCount(): Promise<CountResponse> {
    const count = await this.orderRepository.count();

    return {
      order_count: count,
    };
  }

  async getUserOrders(id: string): Promise<OrderEntity[]> {
    const query = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .where('order.user = :id', { id });

    return await query.getMany();
  }
}
