import { Module } from '@nestjs/common';
import { ProductApiModule } from '@esc/product/api';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity, ProductEntity } from '@esc/product/entities';
import { UserEntity } from '@esc/user/entities';
import { UserApiModule } from '@esc/user/api';

@Module({
  imports: [
    ProductApiModule,
    UserApiModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.49.2',
      port: 30432,
      username: 'postgres',
      password: '123456',
      database: 'eshop',
      entities: [ProductEntity, CategoryEntity, UserEntity],
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
