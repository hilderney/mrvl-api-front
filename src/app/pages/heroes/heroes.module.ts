import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesComponent } from './heroes.component';
import { HeroesRoutingModule } from './heroes-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HeroModule } from 'src/app/components/hero/hero.module';

@NgModule({
  imports: [
    CommonModule,
    HeroesRoutingModule,
    ReactiveFormsModule,
    HeroModule,
  ],
  declarations: [HeroesComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class HeroesModule { }
