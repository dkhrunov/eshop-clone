/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CoreEntity } from '@esc/shared/util-models';
import { ProductEntity } from '@esc/product/models';
import { UserEntity } from '@esc/user/models';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export enum OrderStatus {
  PENDING = 'PENDING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  PROCESSED = 'PROCESSED',
  FAILED = 'FAILED',
}

export const OrderStatusList = Object.keys(OrderStatus);
@Entity('order')
export class OrderEntity extends CoreEntity {
  @Column()
  shippingAddressOne!: string;

  @Column()
  shippingAddressTwo!: string;

  @Column()
  city!: string;

  @Column()
  zip!: string;

  @Column()
  country!: string;

  @Column()
  phone!: string;

  @Column({ default: OrderStatus.PENDING })
  status!: string;

  @Column()
  totalPrice!: number;

  @OneToMany(() => OrderItemEntity, (item) => item.order, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'order_items' })
  orderItems!: OrderItemEntity[];

  @ManyToOne(() => UserEntity, (user) => user.id, {
    eager: true,
    onDelete: 'NO ACTION',
  })
  user!: string;
}

@Entity('order-items')
export class OrderItemEntity extends CoreEntity {
  @ManyToOne(() => ProductEntity, { eager: true, onDelete: 'NO ACTION' })
  @JoinColumn()
  product!: ProductEntity;

  @Column()
  quantity!: number;

  @ManyToOne(() => OrderEntity, (order) => order.id, { onDelete: 'CASCADE' })
  order!: OrderEntity;
}

export class CreateOrderDto {
  @IsArray()
  @ArrayNotEmpty()
  orderItems!: OrderItem[];
  @IsString()
  shippingAddressOne!: string;
  @IsOptional()
  @IsString()
  shippingAddressTwo?: string;
  @IsString()
  city!: string;
  @IsString()
  zip!: string;
  @IsString()
  country!: string;
  @IsMobilePhone()
  phone!: string;
}

export class UpdateOrderStatus {
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status!: string;
}

export type OrderItem = Omit<OrderItemEntity, 'id' | 'dateCreated' | 'order'>;

export interface Cart {
  items: CartItem[];
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartItemWithProduct {
  product: ProductEntity;
  quantity: number;
}
