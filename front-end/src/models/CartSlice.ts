import { CartItem, OrdersItem } from "./CartItem";
import { TListDefaut } from "./ProductSlice";

export interface CartSlice {
  cartOpen: boolean;
  cartItems: CartItem[];
  orders: OrdersItem[]
  isNext: boolean;
}

export interface ICreateOrder {
  products?: string[];
  price?: number;
  totalQuantity?: number;
  userId?: string;
  status?: string;
}

export interface TOrderListDefaut extends TListDefaut {
  userId?: string;
}