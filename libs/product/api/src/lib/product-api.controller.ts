import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductApiService } from './product-api.service';
import {
  CategoryEntity,
  CreateCategoryDto,
  CreateProductDto,
  ProductEntity,
  UpdateCategoryDto,
  UpdateProductDto,
} from '@esc/product/models';
import { CategoryService } from './category-api.service';
import { CountResponse, DeleteResponse } from '@esc/shared/util-models';

@Controller('')
export class ProductApiController {
  constructor(
    private productApiService: ProductApiService,
    private categoryService: CategoryService
  ) {}

  @Get('products')
  getProducts(
    @Query('categories') categories: string
  ): Promise<ProductEntity[]> {
    return this.productApiService.getProducts(categories);
  }

  @Get('products/count')
  getProductsCount(): Promise<CountResponse> {
    return this.productApiService.getProductCount();
  }

  @Get('products/featured')
  getFeaturedProducts(
    @Query('limit') limit?: number
  ): Promise<ProductEntity[]> {
    return this.productApiService.getFeaturedProducts(limit);
  }

  @Get('products/:id')
  getProductById(@Param('id') id: string): Promise<ProductEntity> {
    return this.productApiService.getProduct(id);
  }

  @Post('products')
  createProduct(@Body() dto: CreateProductDto): Promise<ProductEntity> {
    return this.productApiService.createProduct(dto);
  }

  @Put('products/:id')
  updateProduct(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto
  ): Promise<ProductEntity> {
    return this.productApiService.updateProduct(id, dto);
  }

  @Delete('products/:id')
  deleteProduct(@Param('id') id: string): Promise<DeleteResponse> {
    return this.productApiService.deleteProduct(id);
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

  @Delete('categories/:id')
  deleteCategoryById(
    @Param('id') id: string
  ): Promise<{ categoryDeleted: string }> {
    return this.categoryService.deleteCategoryById(id);
  }

  @Put('categories/:id')
  updateCategory(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto
  ): Promise<CategoryEntity> {
    return this.categoryService.updateCategory(id, dto);
  }
}
