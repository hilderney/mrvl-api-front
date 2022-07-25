import { Injectable } from "@angular/core";
import { HeroProfileComponent } from "src/app/pages/home/banner/banners-formats/hero-profile.component";
import { ICharShortResult } from "../interfaces/character.interface";
import { BannerItemModel } from "../models/banner-item.model";

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  getAds(heroes: ICharShortResult[]) {

    let arrBanners: BannerItemModel[] = [];

    heroes.forEach(hero => {
      const banner = new BannerItemModel(
        HeroProfileComponent,
        hero
      );
      arrBanners.push(banner)
    });

    return arrBanners;
  }
}
