import {Product} from "./product";

export interface Purchase {
  date: string,
  paymentMethod: string,
  product: Product;
  status: string;

}
