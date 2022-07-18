import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';
import { IUser } from '../interfaces/user.interface';



@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  public refreshTokenInProgress: boolean = false;
  public refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user: IUser = (this.authenticationService.userValue || localStorage.getItem('token'));
    const isLoggedIn = user && user.token;
    let token = '';
    if (!request.url.includes('oauth-portal-public')) {
      token = this.getToken(request.url);
    }

    if (isLoggedIn) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401) {
          if (!this.refreshTokenInProgress) {
            this.refreshTokenInProgress = true;
            this.refreshTokenSubject.next(null);
            return this.authenticationService.refreshToken().pipe(
              switchMap(
                (data: any) => {
                  this.refreshTokenInProgress = false;
                  this.refreshTokenSubject.next(data.refreshToken);
                  return next.handle(this.injectToken(request));
                }
              )
            );
          } else {
            return this.refreshTokenSubject.pipe(
              filter(result => result !== null),
              take(1),
              switchMap((data: any) => {
                return next.handle(this.injectToken(request))
              })
            );
          }
        } else {
          return throwError(error);
        }
      }));
  }

  injectToken(request: HttpRequest<any>) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.getToken(request.url)}`
      }
    });
    return request;
  }

  getToken(url: string): string {
    return localStorage.getItem('token') || '';
  }
}
