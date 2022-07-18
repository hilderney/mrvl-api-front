import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { notFoundRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    CommonModule,
    notFoundRoutingModule
  ],
  declarations: [NotFoundComponent]
})
export class NotFoundModule { }
