import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero.component';

@NgModule({
  declarations: [
    HeroComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeroComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class HeroModule { }
