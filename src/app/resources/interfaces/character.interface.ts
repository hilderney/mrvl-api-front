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



