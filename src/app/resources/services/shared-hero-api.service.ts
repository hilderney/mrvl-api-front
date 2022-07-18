import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SharedHeroServiceApi {

  private apiKey = 'c27dfcc625c705ff79f65072998277b1';
  private apiTs = '1';
  private apiHash = '222e350f4d828b002734910a214813d9';

  constructor() { }

  builHeroApidUrl(base: string, route: string, payload: any = null): string {
    let params = '';
    if (!!payload) {
      const paramsName = Object.keys(payload);
      paramsName.forEach(item => {
        const itemToAdd = payload[item].length > 0 ? `&${item}=${payload[item]}` : '';
        params = params.concat(itemToAdd);
      });
    }

    return `${base}${route}${this.getHeroValidation()}${params}`;
  }

  private getHeroValidation() {
    return `?apikey=${this.apiKey}&ts=${this.apiTs}&hash=${this.apiHash}`;
  }
}
