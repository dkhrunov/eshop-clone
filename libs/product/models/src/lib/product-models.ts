import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

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
  category!: string;

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

export type ProductEntityWithCategory = ProductEntity & {
  category: CategoryEntity;
};

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsNotEmpty()
  @IsString()
  description?: string;

  @IsString()
  rich_description?: string;

  @IsNotEmpty()
  @IsUrl()
  image?: string;

  @IsOptional()
  @IsArray()
  images?: string[];

  @IsNotEmpty()
  @IsString()
  brand?: string;

  @IsNotEmpty()
  @IsNumber()
  price?: number;

  @IsNotEmpty()
  @IsNumber()
  count_in_stock?: number;

  @IsNotEmpty()
  @IsUUID()
  category?: string;

  @IsNumber()
  @Min(0)
  @Max(10)
  rating?: number;

  @IsNumber()
  @Min(0)
  num_reviews?: number;

  @IsBoolean()
  is_featured?: boolean;
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  rich_description?: string;

  @IsOptional()
  @IsUrl()
  image?: string;

  @IsOptional()
  @IsArray()
  images?: string[];

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  count_in_stock?: number;

  @IsOptional()
  @IsUUID()
  category?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  rating?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  num_reviews?: number;

  @IsOptional()
  @IsBoolean()
  is_featured?: boolean;
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
