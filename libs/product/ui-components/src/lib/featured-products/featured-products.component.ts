import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ProductEntity } from '@esc/product/models';

@Component({
  selector: 'ui-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedProductsComponent {
  @Input() product!: ProductEntity;
}
