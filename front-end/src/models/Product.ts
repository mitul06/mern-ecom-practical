export interface Product {
  _id: string;
  title: string;
  images?: string[];
  price: number;
  rating: number;
  thumbnail?: string;
  description?: string;
  category: LookupType;
  brand?: LookupType;
  stock?: number;
}

export type LookupType = {
  _id: string,
  title: string
}

export interface ICategory {
  _id: string;
  title: string;
  thumbnail?: string;
  description?: string
}

export interface IBrand {
  _id: string;
  title: string;
  thumbnail?: string;
  description?: string
}