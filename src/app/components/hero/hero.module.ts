import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero.component';
import { FormsModule } from '@angular/forms';
import { FavouriteComponent } from './favourite/favourite.component';

@NgModule({
  declarations: [
    HeroComponent,
    FavouriteComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HeroComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class HeroModule { }
