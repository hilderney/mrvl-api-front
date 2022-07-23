import { Injectable } from "@angular/core";
import { LocalStorageNames } from "../consts/localstorage-names.const";
import { ICharFavourite } from "../interfaces/character.interface";

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  fetchList() {
    let list: ICharFavourite[] = [];
    const favsList = localStorage.getItem(LocalStorageNames.favoriteHeroes);
    if (!!favsList)
      list = JSON.parse(favsList);
    return list;
  }

  saveList(list: ICharFavourite[]) {
    localStorage.setItem(
      LocalStorageNames.favoriteHeroes,
      JSON.stringify(list)
    );
  }

  findHeroIndexById(list: ICharFavourite[], heroId: number) {
    return list.findIndex(
      (hero: ICharFavourite) => hero.heroId === heroId
    );
  }
}
