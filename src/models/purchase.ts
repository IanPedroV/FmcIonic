import {Product} from "./product";

export interface Purchase {
  productId: number;
  id: number;
  userId: number,
  userNick: string,
  date: string,
  paymentMethod: string,
  product: Product;
  status: string;

}
