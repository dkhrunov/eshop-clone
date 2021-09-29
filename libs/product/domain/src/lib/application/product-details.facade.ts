import { Injectable } from '@angular/core';
import { ProductsService } from '../..';

@Injectable({ providedIn: 'root' })
export class ProductDetailsFacade {
  constructor(private productService: ProductsService) {}

  productById$ = this.productService.getById$;

  getProductById(id: string): void {
    this.productService.getById(id);
  }
}
