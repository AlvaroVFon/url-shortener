export interface Url {
  url: string;
  shortUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
  clicks: Number;
}

export interface PublicUrl {
  url: string;
  shortUrl: string;
}
