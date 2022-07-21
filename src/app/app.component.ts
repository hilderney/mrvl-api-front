import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { tap, Observable } from 'rxjs';
import { AppState } from './reducers';
import { login } from './pages/login/login.actions';
import { isLoggedIn, isLoggedOut } from './pages/login/login.selectors';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mrvl-api-front';

  isLoggedIn$!: Observable<boolean>;
  isLoggedOut$!: Observable<boolean>;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {

  }

  ngOnInit() {
    const userProfile = localStorage.getItem("user");

    if (userProfile) {
      this.store.dispatch(login({
        user: JSON.parse(userProfile)
      }));
    }

    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          //console.log(event);
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          //console.log(event);
          break;
        }
        default: {
          break;
        }
      }
    });

    this.isLoggedIn$ = this.store
      .pipe(
        select(isLoggedIn),
      );

    this.isLoggedOut$ = this.store
      .pipe(
        select(isLoggedOut),
      );
  }
}
