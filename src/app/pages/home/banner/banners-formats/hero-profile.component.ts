import { Component, Input } from '@angular/core';
import { AdBannerComponent } from 'src/app/resources/interfaces/banner.interface';
import { ICharShortResult } from 'src/app/resources/interfaces/character.interface';


@Component({
  templateUrl: './hero-profile.component.html',
  styleUrls: ['./hero-profile.component.scss'],
})
export class HeroProfileComponent implements AdBannerComponent {
  @Input() data!: ICharShortResult;
}
