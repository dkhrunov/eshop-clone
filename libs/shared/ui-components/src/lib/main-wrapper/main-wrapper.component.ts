import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'ui-main-wrapper',
  templateUrl: './main-wrapper.component.html',
  styleUrls: ['./main-wrapper.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainWrapperComponent {
  @Input() title = '';
  @Input() subtitle = '';
}
