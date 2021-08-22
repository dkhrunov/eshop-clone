import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  image!: string;

  @Column()
  countInStock!: number;
}

export class CreateProductDto {
  @IsNotEmpty()
  name!: string;
  @IsNotEmpty()
  image!: string;
  @IsNotEmpty()
  countInStock!: number;
}
