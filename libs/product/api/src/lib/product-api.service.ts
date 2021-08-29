import {
  CategoryEntity,
  CreateProductDto,
  ProductEntity,
  UpdateProductDto,
} from '@esc/product/models';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CountResponse, ErrorMessages } from '@esc/shared/util-models';

@Injectable()
export class ProductApiService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>
  ) {}

  async getProducts(categories?: string): Promise<ProductEntity[]> {
    if (categories) {
      const categoriesNames = categories.split(',');

      const allCategories = await this.categoryRepository.find();

      const foundCategoriesIds = allCategories
        .filter(({ name }: CategoryEntity) => categoriesNames.includes(name))
        .map(({ id }: CategoryEntity) => id);

      return this.productRepository.find({
        relations: ['category'],
        where: { category: In(foundCategoriesIds) },
      });
    }

    return this.productRepository.find({
      relations: ['category'],
    });
  }

  async getProductCount(): Promise<CountResponse> {
    const [, product_count] = await this.productRepository.findAndCount();
    return { product_count };
  }

  async getFeaturedProducts(limit?: number): Promise<ProductEntity[]> {
    const query = this.productRepository
      .createQueryBuilder('featured_products')
      .where('is_featured = true');

    if (limit) {
      query.limit(limit);
    }

    const products = await query.getMany();

    return products;
  }

  async getProduct(id: string): Promise<ProductEntity> {
    const product = await this.productRepository.findOne(id, {
      relations: ['category'],
    });

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  async createProduct(dto: CreateProductDto): Promise<ProductEntity> {
    const category = await this.categoryRepository.findOne(dto.category);

    if (!category) {
      throw new NotFoundException(ErrorMessages.CATEGORY_NOT_FOUND);
    }

    const product = this.productRepository.create(dto);

    product.category = category.id;

    try {
      return await this.productRepository.save(product);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateProduct(
    id: string,
    dto: UpdateProductDto
  ): Promise<ProductEntity> {
    await this.productRepository.update(id, dto);

    return await this.getProduct(id);
  }

  async deleteProduct(id: string): Promise<void> {
    const result = await this.productRepository.delete(id);

    if (result.affected !== 1) {
      throw new NotFoundException();
    }
  }
}
