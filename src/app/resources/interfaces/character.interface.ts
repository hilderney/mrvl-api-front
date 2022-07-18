export interface ICharPayload {

}

export interface ICharResponse {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: ICharData;
}


export interface ICharData {
  offset: number,
  limit: number,
  total: number,
  count: number,
  results: ICharShortResult[];
}

export interface ICharShortResult {
  id: 1011334;
  name: string;
  description: string;
  modified: Date;
  thumbnail: ICharShortThumb;
  resourceURI: string;
  comics: ICharShortAparitions;
  series: ICharShortAparitions;
  stories: ICharShortAparitions;
  events: ICharShortAparitions;
  urls: IUrls;
}


export interface ICharShortThumb {
  path: string;
  extension: string;
}

export interface ICharShortAparitions {
  available: number;
  collectionURI: string;
  returned: number;
  items: ICharShortAparitionsItem[];
}

export interface ICharShortAparitionsItem {
  resourceURI: string;
  name: string;
  type?: string;
}

export interface IUrls {
  type: string;
  url: string;
}



