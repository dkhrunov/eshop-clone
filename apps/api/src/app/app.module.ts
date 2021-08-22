import { Module } from '@nestjs/common';
import { ProductApiModule } from '@esc/product/api';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '@esc/product/entities';

@Module({
  imports: [
    ProductApiModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.49.2',
      port: 30432,
      username: 'postgres',
      password: '123456',
      database: 'eshop',
      entities: [ProductEntity],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
