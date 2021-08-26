import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProductApiService } from './product-api.service';
import {
  CategoryEntity,
  CreateCategoryDto,
  CreateProductDto,
  ProductEntity,
  UpdateCategoryDto,
} from '@esc/product/entities';
import { CategoryService } from './category-api.service';
import { UpdateResult } from 'typeorm';

@Controller('')
export class ProductApiController {
  constructor(
    private productApiService: ProductApiService,
    private categoryService: CategoryService
  ) {}

  @Get('products')
  getProducts(): Promise<ProductEntity[]> {
    return this.productApiService.getProducts();
  }

  @Get('products/:id')
  getProductById(@Param('id') id: string): Promise<ProductEntity> {
    return this.productApiService.getProduct(id);
  }

  @Post('products')
  createProduct(@Body() dto: CreateProductDto): Promise<ProductEntity> {
    return this.productApiService.createProduct(dto);
  }

  @Get('categories')
  getCategory(): Promise<CategoryEntity[]> {
    return this.categoryService.getCategories();
  }

  @Post('categories')
  createCategory(@Body() dto: CreateCategoryDto): Promise<CategoryEntity> {
    return this.categoryService.createCategory(dto);
  }

  @Get('categories/:id')
  getCategoryById(@Param('id') id: string): Promise<CategoryEntity> {
    return this.categoryService.getCategoryById(id);
  }

  @Put('categories/:id')
  updateCategory(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto
  ): Promise<CategoryEntity> {
    return this.categoryService.updateCategory(id, dto);
  }
}
