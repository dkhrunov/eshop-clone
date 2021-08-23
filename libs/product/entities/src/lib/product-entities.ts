import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  // @Column()
  // description!: string;

  // @Column()
  // richDescription!: string;

  @Column()
  image!: string;

  // @Column()
  // images!: string[];

  // @Column()
  // brand!: string;

  // @Column()
  // price!: number;

  // @Column()
  // // category!: CategoryEntity;
  // @Column()
  // countInStock!: number;

  // @Column()
  // rating!: number;

  // @Column()
  // isFeatured!: boolean;

  // @CreateDateColumn()
  // dateCreated!: Date;
}

export class CreateProductDto {
  @IsNotEmpty()
  name!: string;
  @IsNotEmpty()
  image!: string;
  @IsNotEmpty()
  countInStock!: number;
}
