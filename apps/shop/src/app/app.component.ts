import { Component } from '@angular/core';
import { CartStorageService } from '@esc/shared/util-services';

@Component({
  selector: 'esc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  constructor(private cartStorageService: CartStorageService) {}

  itemsInCartCount$ = this.cartStorageService.itemsInCartCount$;
}
