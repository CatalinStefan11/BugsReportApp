import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';

import { AuthService } from './user/auth.service';
import { slideInAnimation } from './app.animation';
import { User } from './user/user2';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  pageTitle = 'Bugs Report Application';
  loading = true;
  currentUser: User;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }


  get userName(): string {
    if (this.authService.user) {
      return this.authService.user.email;
    }
    return '';
  }

  constructor(private authService: AuthService,
              private router: Router) {
    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
     });
    this.currentUser = this.authService.user;
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }


  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/welcome');
    
  }
}
