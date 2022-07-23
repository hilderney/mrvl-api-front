import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesComponent } from './heroes.component';
import { HeroesRoutingModule } from './heroes-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroModule } from 'src/app/components/hero/hero.module';
import { PaginationModule } from 'src/app/components/pagination/pagination.module';

@NgModule({
  imports: [
    CommonModule,
    HeroesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HeroModule,
    PaginationModule,
  ],
  declarations: [HeroesComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class HeroesModule { }
