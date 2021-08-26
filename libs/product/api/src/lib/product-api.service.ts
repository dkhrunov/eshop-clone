import {
  CategoryEntity,
  CreateProductDto,
  ProductEntity,
} from '@esc/product/entities';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductApiService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>
  ) {}

  async getProducts(): Promise<ProductEntity[]> {
    return this.productRepository.find({ loadRelationIds: true });
  }

  async getProduct(id: string): Promise<ProductEntity> {
    const product = await this.productRepository.findOne(id, {
      relations: ['category_id'],
    });

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  async createProduct(dto: CreateProductDto): Promise<ProductEntity> {
    const category = await this.categoryRepository.findOne(dto.category_id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const product = this.productRepository.create(dto);

    product.category_id = category.id;

    try {
      const savedProduct = await this.productRepository.save(product);
      return savedProduct;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
