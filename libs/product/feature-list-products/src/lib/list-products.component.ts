import { Component } from '@angular/core';
import { ListProductsFacade } from '@esc/product/domain';

@Component({
  selector: 'product-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.less'],
})
export class ListProductsComponent {
  constructor(private listProductsFacade: ListProductsFacade) {}
}
