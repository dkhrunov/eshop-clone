import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  inputValue: string | null = null;
}
