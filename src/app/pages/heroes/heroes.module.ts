import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesComponent } from './heroes.component';
import { HeroesRoutingModule } from './heroes-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HeroesRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [HeroesComponent]
})
export class HeroesModule { }
