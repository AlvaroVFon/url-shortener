export interface Url {
  url: string;
  shortUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PublicUrl { 
  url: string;
  shortUrl: string;
}
