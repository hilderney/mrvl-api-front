import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of } from 'rxjs';

import { IUser } from '../interfaces/user.interface';
import { ILoginPayload, ILoginResponse } from '../interfaces/login-api.interface';
import { environment } from 'src/environments/environment';


@Injectable(
  { providedIn: 'root' }
)
export class AuthenticationService {

  public user: Observable<any>;
  private userSubject: BehaviorSubject<any>;
  private mockToken: string = 'lsGPLl4k6Vc4J0VhnFaMBqetNtn1ofsB';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<any>(null);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): IUser {
    return this.userSubject.value;
  }

  public login(payload: ILoginPayload) {

    return this.http.post<ILoginResponse>(`${environment.authenticationApi}auth/login`, payload, { withCredentials: false })
      .pipe(
        map((response: ILoginResponse) => {
          if (response.status) {
            return this.setStorageAndUserVariables(response.user);
          } else {
            throw Error(response.message || 'Falha ao autenticar');
          }
        })
      );
  }

  public logout() {
    this.stopRefreshTokenTimer();
    localStorage.clear();
    sessionStorage.clear();
    this.userSubject.next(null as unknown as IUser);
    this.router.navigate(['/login']);
  }

  public refreshToken() {
    return of('mock')
      .pipe(
        map(() => {
          const token = localStorage.getItem('token');
          if (token) {
            localStorage.setItem('token', token);
            return token;
          } else {
            return null;
            this.logout();
          }
        }
        ));
  }

  public updateUser(user: IUser) {
    this.userSubject.next(user);
    localStorage.setItem('token', JSON.stringify(user));
  }

  public setStorageAndUserVariables(user: IUser): IUser {
    localStorage.setItem('token', this.mockToken);
    localStorage.setItem('idUsuario', user.uuid);
    localStorage.setItem('refreshToken', this.mockToken);
    this.startRefreshTokenTimer();
    return user;
  }

  // helper methods
  private refresh() {
    // This is intentional
  }

  private refreshTokenTimeout: ReturnType<typeof setTimeout> = setTimeout(this.refresh, 0);

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  private startRefreshTokenTimer() {
    const expires = new Date(2025, 12, 31);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
