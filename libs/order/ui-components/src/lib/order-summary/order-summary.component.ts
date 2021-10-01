import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'ui-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderSummaryComponent {
  @Input() itemsPrice = 0;
  @Input() totalPrice = 0;
}
