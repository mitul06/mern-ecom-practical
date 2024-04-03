import { ICategory } from "./Product";

export interface ICategorySlice {
  allCategories: ICategory[];
  isLoading?: boolean
  isNext?: boolean
}

export type TListDefaut = {
  skip: number
  limit: number,
  sort: string,
  sortType: string,
}