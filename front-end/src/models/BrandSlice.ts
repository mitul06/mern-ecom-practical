import { IBrand } from "./Product";

export interface IBrandSlice {
  allBrands: IBrand[];
  isLoading?: boolean
  isNext?: boolean
}

export type TListDefaut = {
  skip: number
  limit: number,
  sort: string,
  sortType: string,
}