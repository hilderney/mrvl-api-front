import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICharData, ICharPayload, ICharResponse, ICharShortResult, IpaginationResult } from '../interfaces/character.interface';
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

  fetchCharacters(payload: ICharPayload): Observable<IpaginationResult<ICharShortResult[]>> {
    return this.http.get<ICharResponse>(
      this.sharedApi.builHeroApidUrl(environment.heroApi, this.charRoute, payload))
      .pipe(
        map((response: ICharResponse) => {

          const count = response.data.count;
          const limit = response.data.limit;
          const offset = response.data.offset;
          const total = response.data.total;

          const first = 1;
          const last = Math.ceil(total / limit);
          const page = Math.floor(((((total - offset) / limit) - last) * -1) + 1);
          const hasNext = ((offset + limit) < total);
          const hasPrev = ((offset + limit) > limit);

          return {
            pagination: {
              first: first,
              previous: hasPrev && page > first ? page - 1 : page,
              page: page,
              next: hasNext && page < last ? page + 1 : page,
              hasPrev: hasPrev,
              hasNext: hasNext,
              last: last,
              count: response.data.count,
              limit: response.data.limit,
              offset: response.data.offset,
              total: response.data.total,
            },
            heroes: response.data.results
          }
        })
      );
  }
}
