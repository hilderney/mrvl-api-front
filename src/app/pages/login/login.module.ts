import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './login.effects';
import * as fromAuth from './reducers';
import { authReducer } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthGuard } from 'src/app/resources/guards/auth.guard';
import { AuthenticationService } from 'src/app/resources/services/authentication.service';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: LoginComponent }]),
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule {
  static forRoot(): ModuleWithProviders<LoginModule> {
    return {
      ngModule: LoginModule,
      providers: [
        AuthenticationService,
        AuthGuard
      ]
    }
  }
}
