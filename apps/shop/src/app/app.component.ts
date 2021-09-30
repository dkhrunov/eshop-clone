import { Component } from '@angular/core';
import { CartStorageService } from '@esc/shared/util-services';
import { map, pluck } from 'rxjs';

@Component({
  selector: 'esc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  constructor(private cartStorageService: CartStorageService) {}

  cartCount$ = this.cartStorageService.cart$.pipe(
    pluck('items'),
    map((items) => items.reduce((acc, item) => acc + item.quantity, 0))
  );
}
