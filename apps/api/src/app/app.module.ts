import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ProductApiModule } from '@esc/product/api';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity, ProductEntity } from '@esc/product/entities';
import { UserEntity } from '@esc/user/entities';
import { AuthMiddleware, UserApiModule } from '@esc/user/api';

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
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        {
          path: '/api/users',
          method: RequestMethod.POST,
        },
        {
          path: '/api/users/login',
          method: RequestMethod.POST,
        },
        {
          path: '/api/categories(.*)',
          method: RequestMethod.GET,
        },
        {
          path: '/api/products(.*)',
          method: RequestMethod.GET,
        }
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
