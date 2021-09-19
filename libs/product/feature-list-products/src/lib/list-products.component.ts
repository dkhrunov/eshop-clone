import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListProductsFacade } from '@esc/product/domain';
import { ProductEntity } from '@esc/product/models';
import { compareDesc } from 'date-fns';

@Component({
  selector: 'product-list-produ32cts',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.less'],
})
export class ListProductsComponent {
  constructor(
    private listProductsFacade: ListProductsFacade,
    private router: Router
  ) {}

  products$ = this.listProductsFacade.products$;

  sortByDateFn(left: ProductEntity, right: ProductEntity): number {
    const leftDate = new Date(left.dateCreated);
    const rightDate = new Date(right.dateCreated);

    return compareDesc(leftDate, rightDate);
  }

  deleteProduct(id: string): void {
    this.listProductsFacade.deleteProduct(id);
  }

  editProduct(id: string): void {
    this.router.navigate(['products', 'form', id]);
  }
}
