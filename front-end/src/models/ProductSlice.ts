import { Product } from "./Product";

export interface ProductSlice {
  allProducts: Product[];
  newProducts: Product[];
  featuredProducts: Product[];
  wishlist: Product[];
  categories: string[];
  viewProduct?: Product | null
  isLoading?: boolean
  isNext?: boolean
}

export type TListDefaut = {
  skip: number
  limit: number,
  sort: string,
  sortType: string,
}