import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterEvent, Event } from '@angular/router';
import { LoginUserFacade } from '@esc/user/domain';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'esc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private loginUserFacade: LoginUserFacade
  ) {}

  showSidebar$ = this.router.events.pipe(
    filter(
      (event: Event): event is RouterEvent => event instanceof NavigationEnd
    ),
    map((event) => {
      return event.url === '/login' || event.url === '/register' ? false : true;
    })
  );

  logout(): void {
    this.loginUserFacade.logout();
    this.router.navigate(['login']);
  }
}
