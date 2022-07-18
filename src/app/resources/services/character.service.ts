import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICharData, ICharPayload, ICharResponse } from '../interfaces/character.interface';
import { SharedHeroServiceApi } from './shared-hero-api.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  charRoute: string = 'characters';

  constructor(
    private http: HttpClient,
    private sharedApi: SharedHeroServiceApi
  ) { }

  fetchCharacters(payload: ICharPayload): Observable<ICharData> {
    return this.http.get<ICharResponse>(
      this.sharedApi.builHeroApidUrl(environment.heroApi, this.charRoute, payload))
      .pipe(
        map((response: ICharResponse) => {
          return response.data;
        })
      )
  }
}
