import { Component } from '@angular/core';
import { ProductDetailsFacade } from '@esc/product/domain';

@Component({
  selector: 'product-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.less'],
})
export class ProductDetailsComponent {
  constructor(private productDetailsFacade: ProductDetailsFacade) {}
}
