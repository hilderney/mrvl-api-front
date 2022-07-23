import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocalStorageNames } from 'src/app/resources/consts/localstorage-names.const';
import { ICharFavourite, ICharShortResult } from 'src/app/resources/interfaces/character.interface';
import { FavouritesService } from 'src/app/resources/services/favourites.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {

  @Input() hero!: ICharShortResult;
  @Output() favouriteEmitter!: EventEmitter<ICharFavourite>;
  heroesListed: ICharFavourite[] = [];
  power: number = 0;
  fav!: ICharFavourite;

  constructor(
    private favService: FavouritesService,
  ) { }

  ngOnInit() {
    this.getValue();
  }

  setValue(val: number) {
    this.heroesListed = this.favService.fetchList();

    this.power = val;
    const id = this.hero.id;
    this.fav = {
      heroId: this.hero.id,
      power: this.power
    }

    if (this.heroesListed.length === 0) {
      this.heroesListed.push(this.fav);
      this.favService.saveList(this.heroesListed);
      return;
    }

    const indexHero = this.favService
      .findHeroIndexById(this.heroesListed, this.fav.heroId);

    if (indexHero >= 0)
      this.heroesListed[indexHero].power = this.power;
    else
      this.heroesListed.push(this.fav);

    this.favService.saveList(this.heroesListed);
  }

  getValue() {
    this.heroesListed = this.favService.fetchList();

    const indexHero = this.favService
      .findHeroIndexById(this.heroesListed, this.hero.id);

    if (indexHero < 0)
      return;

    this.power = this.heroesListed[indexHero].power;

  }

}
