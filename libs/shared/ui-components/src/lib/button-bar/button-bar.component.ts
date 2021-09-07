import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ui-button-bar',
  templateUrl: './button-bar.component.html',
  styleUrls: ['./button-bar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonBarComponent {}
