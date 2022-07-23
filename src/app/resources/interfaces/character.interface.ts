export interface ICharPayload {
  nameStartsWith: string,
  limit: number,
  offset: number,
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

export interface IpaginationResult<T> {
  pagination: IPaginationView,
  heroes: T
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


interface ICharShortThumb {
  path: string;
  extension: string;
}

interface ICharShortAparitions {
  available: number;
  collectionURI: string;
  returned: number;
  items: ICharShortAparitionsItem[];
}

interface ICharShortAparitionsItem {
  resourceURI: string;
  name: string;
  type?: string;
}

interface IUrls {
  type: string;
  url: string;
}

export interface IPaginationView {
  first: number;
  previous: number;
  page: number;
  next: number;
  last: number;
  hasPrev: boolean;
  hasNext: boolean;
  count: number;
  limit: number;
  offset: number;
  total: number;
}

export interface ICharFavourite {
  heroId: number,
  power: number,
}



