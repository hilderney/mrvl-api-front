import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { ICharFavourite, ICharShortResult } from 'src/app/resources/interfaces/character.interface';
import { CharacterService } from 'src/app/resources/services/character.service';
import { FavouritesService } from 'src/app/resources/services/favourites.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: 'auto',
        opacity: 1,
      })),
      state('closed', style({
        height: '0px',
        opacity: 0,
      })),
      transition('open => closed', [
        animate('0.5s 0.2s ease-in')
      ]),
      transition('closed => open', [
        animate('0.5s 0.2s ease-in')
      ])
    ]),
  ],
})
export class HomeComponent implements OnInit {

  heroesListed$!: Observable<ICharShortResult[]>;
  topFiveListed$!: Observable<ICharShortResult[]>;
  topFive: ICharFavourite[] = [];
  favs: ICharFavourite[] = [];
  paginationSize: number = 10;
  tabTopFive: boolean = true;

  constructor(
    private favService: FavouritesService,
    private charService: CharacterService,
  ) { }

  ngOnInit() {
    this.fetchFavouritesHeroes();
    this.listTopFive();
  }

  fetchFavouritesHeroes() {

    if (!this.favService.hasListChanged()) {
      this.heroesListed$ = this.favService.fetchHeroesListed();
      return;
    }

    this.favs = this.favService.fetchList();
    const heroesIds = this.favService.fetchIdsFromFavourites(this.favs);

    const requests = heroesIds.map(id => {
      return this.charService.fetchCharacterById(id);
    });

    this.heroesListed$ = combineLatest(requests)
      .pipe(
        map((response: ICharShortResult[]) => {
          this.favService.saveFavouriteHeroesList(response);
          this.favService.listChanged(false);
          return response;
        })
      );
  }

  listTopFive() {

    this.topFiveListed$ = this.heroesListed$
      .pipe(
        map((heroes: ICharShortResult[]) => {
          this.topFive = this.findTopFiveFavs();
          const topFiveIds: number[] = this.favService.fetchIdsFromFavourites(this.topFive);
          return this.favService.findHeroesByIds(heroes, topFiveIds);
        })
      )
  }

  findTopFiveFavs(): ICharFavourite[] {
    this.favs = this.favService.fetchList();

    const sortedFavs = this.favs.sort(function (a, b) {
      return b.power - a.power
    });

    return sortedFavs.slice(0, 5);
  }
}
