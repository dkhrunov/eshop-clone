import { CreateProductDto, ProductEntity } from '@esc/product/entities';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductApiService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) {}

  async getProducts(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  async createProduct(dto: CreateProductDto): Promise<ProductEntity> {
    const product = this.productRepository.create(dto);

    try {
      const savedProduct = await this.productRepository.save(product);
      return savedProduct;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
