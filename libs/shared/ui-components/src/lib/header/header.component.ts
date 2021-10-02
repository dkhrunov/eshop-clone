import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'ui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() cartCount$!: Observable<number>;
  @Input() isLoggedIn$!: Observable<boolean>;
  @Output() logOutUser = new EventEmitter();

  inputValue: string | null = null;

  logOut(): void {
    this.logOutUser.emit();
  }
}
