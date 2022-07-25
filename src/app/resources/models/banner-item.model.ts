import { Type } from '@angular/core';
import { AdBannerComponent } from '../interfaces/banner.interface';
import { ICharShortResult } from '../interfaces/character.interface';

export class BannerItemModel {
  constructor(public component: Type<AdBannerComponent>, public data: ICharShortResult) { }
}
