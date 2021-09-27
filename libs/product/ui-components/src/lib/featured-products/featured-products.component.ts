import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'components-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturedProductsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
