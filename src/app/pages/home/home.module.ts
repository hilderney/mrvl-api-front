import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HeroComponent } from 'src/app/components/hero/hero.component';
import { HeroModule } from 'src/app/components/hero/hero.module';
import { BannerDirective } from 'src/app/resources/directive/banner.directive';
import { BannerComponent } from './banner/banner.component';
import { BannerService } from 'src/app/resources/services/banner.service';
import { HeroProfileComponent } from './banner/banners-formats/hero-profile.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    HeroModule,

  ],
  declarations: [
    HomeComponent,
    BannerComponent,
    BannerDirective,
    HeroProfileComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    BannerService
  ],
})
export class HomeModule { }
