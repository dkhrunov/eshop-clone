import { Injectable } from '@angular/core';
import { CreateProductDto, ProductEntity } from '@esc/product/models';
import { ProductsService } from '../infrastructure/products.service';

@Injectable({ providedIn: 'root' })
export class ListProductsFacade {
  constructor(private productsService: ProductsService) {}

  products$ = this.productsService.resources$;

  createdProduct$ = this.productsService.created$;

  updatedProduct$ = this.productsService.updated$;

  productById$ = this.productsService.getById$;

  createProduct(product: CreateProductDto) {
    this.productsService.create(product);
  }

  getProductById(id: string): void {
    this.productsService.getById(id);
  }

  deleteProduct(id: string) {
    this.productsService.delete(id);
  }

  updateProduct(id: string, product: ProductEntity) {
    this.productsService.update(id, product);
  }
}
