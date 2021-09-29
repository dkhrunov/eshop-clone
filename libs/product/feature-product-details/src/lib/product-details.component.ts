import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsFacade } from '@esc/product/domain';
import {
  combineLatest,
  filter,
  map,
  pluck,
  shareReplay,
  take,
  tap,
} from 'rxjs';
@Component({
  selector: 'product-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.less'],
})
export class ProductDetailsComponent {
  constructor(
    private productDetailsFacade: ProductDetailsFacade,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  quantity = 1;
  activeImage = '';

  product$ = combineLatest([
    this.productDetailsFacade.productById$,
    this.route.params.pipe(
      pluck('id'),
      filter(Boolean),
      tap((id) => {
        this.productDetailsFacade.getProductById(id);
      })
    ),
  ]).pipe(
    map(([product]) => product),
    take(1),
    shareReplay(1)
  );
}
