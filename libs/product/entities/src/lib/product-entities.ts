import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
@Check(`"countInStock" > 0 AND "countInStock" < 255 `)
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 20 })
  name!: string;

  @Column()
  description!: string;

  @Column({ default: '' })
  rich_description!: string;

  @Column()
  image!: string;

  @Column('text', { array: true, default: [] })
  images!: string[];

  @Column()
  brand!: string;

  @Column()
  price!: number;

  @ManyToOne(() => CategoryEntity, (category) => category.id)
  @JoinColumn({ name: 'category_id' })
  category_id!: string;

  @Column()
  count_in_stock!: number;

  @Column({ default: 0 })
  rating!: number;

  @Column({ default: 0 })
  num_reviews!: number;

  @Column({ type: 'boolean' })
  is_featured!: boolean;

  @CreateDateColumn()
  date_created!: Date;
}

export class CreateProductDto {
  @IsNotEmpty()
  name!: string;
  @IsNotEmpty()
  image!: string;
  @IsNotEmpty()
  count_in_stock!: number;
  @IsNotEmpty()
  category_id!: string;
}

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column()
  color!: string;

  @Column()
  icon!: string;

  @Column()
  image!: string;
}

export class CreateCategoryDto {
  @IsNotEmpty()
  name!: string;
  @IsNotEmpty()
  image!: string;
  @IsNotEmpty()
  color!: string;
  @IsNotEmpty()
  icon!: string;
}

export class UpdateCategoryDto {
  @IsNotEmpty()
  name?: string;
  @IsNotEmpty()
  image?: string;
  @IsNotEmpty()
  color?: string;
  @IsNotEmpty()
  icon?: string;
}
