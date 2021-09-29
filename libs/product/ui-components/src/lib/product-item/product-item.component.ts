import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ProductEntity } from '@esc/product/models';

@Component({
  selector: 'ui-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItemComponent {
  constructor(private router: Router) {}

  @Input() product!: ProductEntity;

  addToCart(id: string): void {
    console.log(id);
  }

  goToProductPage(id: string): void {
    this.router.navigate(['products', id]);
  }
}
