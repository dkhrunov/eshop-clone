import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'components-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCardComponent {
  @Input() title = '';
  @Input() icon = '';
  @Input() value = '';
}
