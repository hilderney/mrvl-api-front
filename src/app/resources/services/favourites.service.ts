import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { LocalStorageNames } from "../consts/localstorage-names.const";
import { ICharFavourite, ICharShortResult } from "../interfaces/character.interface";

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  fetchList(): ICharFavourite[] {
    let list: ICharFavourite[] = [];
    const favsList = localStorage.getItem(LocalStorageNames.favouriteHeroes);
    if (!!favsList)
      list = JSON.parse(favsList);
    return list;
  }

  saveList(list: ICharFavourite[]) {
    localStorage.removeItem(LocalStorageNames.favouriteHeroesListed);
    localStorage.setItem(
      LocalStorageNames.favouriteHeroes,
      JSON.stringify(list)
    );
  }

  saveFavouriteHeroesList(list: ICharShortResult[]) {
    localStorage.removeItem(LocalStorageNames.favouriteHeroesListed);
    localStorage.setItem(LocalStorageNames.favouriteHeroesListed, JSON.stringify(list));
  }

  listChanged(status: boolean) {
    localStorage.setItem(
      LocalStorageNames.favouriteHasChanged,
      JSON.stringify(status)
    );
  }

  hasListChanged(): boolean {
    const favStatus = localStorage.getItem(
      LocalStorageNames.favouriteHasChanged
    );
    if (!!favStatus) {
      return JSON.parse(favStatus);
    }
    return false;
  }

  findHeroIndexById(list: ICharFavourite[], heroId: number): number {
    return list.findIndex(
      (hero: ICharFavourite) => hero.heroId === heroId
    );
  }

  findHeroesByIds(list: ICharShortResult[], heroesIds: number[]): ICharShortResult[] {
    const topFive = list.filter(
      (hero: ICharShortResult) => heroesIds.includes(hero.id)
    );

    const topFiveSorted = heroesIds.map(id => {
      return topFive.find((hero: ICharShortResult) => hero.id === id);
    });

    return topFiveSorted as ICharShortResult[];
  }

  fetchIdsFromFavourites(list: ICharFavourite[]): number[] {
    return list.map((heroe: ICharFavourite) => {
      return heroe.heroId
    });
  }

  fetchHeroesListed(): Observable<ICharShortResult[]> {
    let list: ICharShortResult[] = [];
    const heroesList = localStorage.getItem(LocalStorageNames.favouriteHeroesListed);
    if (!!heroesList)
      list = JSON.parse(heroesList);
    return of(list);
  }
}
