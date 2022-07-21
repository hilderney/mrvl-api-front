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
  private mockToken: string = 'lsGPLl4k6Vc4J0VhnFaMBqetNtn1ofsB';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  public login(payload: ILoginPayload) {
    return this.http.post<ILoginResponse>(
      `${environment.authenticationApi}auth/login`,
      payload,
      { withCredentials: false }
    );
  }
}
