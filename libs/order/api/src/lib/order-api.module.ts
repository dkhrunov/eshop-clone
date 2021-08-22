import { Module } from '@nestjs/common';
import { OrderApiController } from './order-api.controller';
import { OrderApiService } from './order-api.service';

@Module({
  controllers: [OrderApiController],
  providers: [OrderApiService],
  exports: [OrderApiService],
})
export class OrderApiModule {}
