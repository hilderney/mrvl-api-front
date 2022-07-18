import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Loading, Notify } from 'notiflix';
import { ILoginPayload } from 'src/app/resources/interfaces/login-api.interface';
import { AuthenticationService } from 'src/app/resources/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  private returnUrl: any;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.authenticationService.userValue)
      this.router.navigate(['/']);

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  ngOnInit() {
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

    const payload: ILoginPayload = {
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
    }

    this.authenticationService.login(payload)
      .subscribe({
        next: () => {
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
