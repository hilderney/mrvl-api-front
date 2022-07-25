import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { AppState } from 'src/app/reducers';
import { ILoginPayload, ILoginResponse } from 'src/app/resources/interfaces/login-api.interface';
import { AuthenticationService } from 'src/app/resources/services/authentication.service';
import { isLoggedIn } from './login.selectors';
import { login } from './login.actions';

import { Loading, Notify } from 'notiflix';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form!: FormGroup;
  private returnUrl: any;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';

    const userProfile = localStorage.getItem("user");

    if (userProfile) {
      this.router.navigateByUrl('/home');
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  get controls() { return this.form.controls; }

  onSubmit() {
    if (this.form.invalid) {
      Notify.warning('Preencha os campos corretamente.');
      return;
    }

    this.login();
  }

  login() {
    Loading.circle();

    const payload: ILoginPayload = this.form.getRawValue();

    this.authenticationService.login(payload)
      .pipe(
        tap((response: ILoginResponse) => {
          const user = response.user;
          this.store.dispatch(login({ user }));
        })
      ).subscribe({
        next: () => {
          Notify.success('Usuário Logado');
          this.router.navigate([this.returnUrl]);
          Loading.remove();
        },
        error: error => {
          Notify.failure(error.message || 'Falha ao fazer login');
          Loading.remove();
        }
      });
  }
}
