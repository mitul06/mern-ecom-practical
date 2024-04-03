import { Product } from "./Product";

export interface CartItem extends Product {
  quantity?: number;
}

export interface OrdersItem {
  _id?: string,
  products: Product[],
  price: number,
  status: string,
  totalQuantity?: number,
  userId: {
    _id: string,
    firstNam: string,
    lastName: string,
    email: string
  },
  createdAt: string
}