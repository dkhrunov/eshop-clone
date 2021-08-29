import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { CoreEntity } from '@esc/shared/util-models';
import { ProductEntity } from '@esc/product/models';
import { UserEntity } from '@esc/user/models';

export enum OrderStatus {
  PENDING = 'Pending',
}
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

  @ManyToMany(() => OrderItemEntity)
  @JoinTable({ name: 'order_items' })
  orderItems!: OrderItemEntity[];

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user!: UserEntity;
}

@Entity('order-item')
export class OrderItemEntity extends CoreEntity {
  @ManyToOne(() => ProductEntity)
  @JoinColumn()
  product!: ProductEntity;

  @Column()
  quantity!: number;
}

export class CreateOrderDto {
  //
}
