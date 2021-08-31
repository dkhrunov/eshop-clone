import { OrderEntity, OrderItemEntity } from '@esc/order/models';
import { ProductEntity } from '@esc/product/models';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderApiController } from './order-api.controller';
import { OrderApiService } from './order-api.service';

@Module({
  controllers: [OrderApiController],
  providers: [OrderApiService],
  exports: [OrderApiService],
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderItemEntity, ProductEntity]),
  ],
})
export class OrderApiModule {}
