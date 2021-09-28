import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ProductEntity } from '@esc/product/models';

@Component({
  selector: 'ui-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItemComponent {
  @Input() product!: ProductEntity;
}
