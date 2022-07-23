import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HeroComponent } from 'src/app/components/hero/hero.component';
import { HeroModule } from 'src/app/components/hero/hero.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    HeroModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
