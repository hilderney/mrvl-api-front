import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable(
  { providedIn: 'root' }
)
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authenticationService.userValue || localStorage.getItem('token');
    if (user) {
      console.log('Auth has user', user);
      return true;
    } else {
      console.log('Auth has no User', user)
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url.trim() } });
      return false;
    }
  }
}
