import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MrvlComponent } from './layouts/mrvl/mrvl.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './resources/guards/auth.guard';

const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: MrvlComponent,
    children: [
      { path: 'home', canActivate: [AuthGuard], data: { roles: [] }, loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
    ]
  },
  {
    path: '',
    component: LoginComponent,
    children: [
      { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
    ]
  },
  { path: 'not-found', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
