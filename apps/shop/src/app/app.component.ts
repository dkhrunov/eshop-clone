import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartStorageService } from '@esc/shared/util-services';
import { UserService } from '@esc/user/domain';
import { LoginUserFacade } from '@esc/user/domain';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs';

@Component({
  selector: 'esc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(
    private cartStorageService: CartStorageService,
    private userService: UserService,
    private loginUserFacade: LoginUserFacade,
    private router: Router
  ) {}

  isUserLoggedIn$ = this.userService.isUserLoggedIn$.pipe(shareReplay());

  itemsInCartCount$ = this.cartStorageService.itemsInCartCount$;

  logOut(): void {
    this.loginUserFacade.logout();
    this.router.navigate(['/']);
  }
}
