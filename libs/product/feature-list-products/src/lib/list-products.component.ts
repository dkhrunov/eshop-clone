import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListProductsFacade } from '@esc/product/domain';
import { sortByDateFn } from '@esc/shared/util-helpers';

@Component({
  selector: 'product-list-produ32cts',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListProductsComponent {
  constructor(
    private listProductsFacade: ListProductsFacade,
    private router: Router
  ) {}

  products$ = this.listProductsFacade.products$;

  sortByDateFn = sortByDateFn;

  deleteProduct(id: string): void {
    this.listProductsFacade.deleteProduct(id);
  }

  editProduct(id: string): void {
    this.router.navigate(['products', 'form', id]);
  }
}
