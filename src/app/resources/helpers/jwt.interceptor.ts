import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';
import { IUser } from '../interfaces/user.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';



@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  public refreshTokenInProgress: boolean = false;
  public refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private authenticationService: AuthenticationService,
    private store: Store<AppState>
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.injectToken(request));
  }

  injectToken(request: HttpRequest<any>) {
    request = request.clone();
    return request;
  }
}
