import {Category} from "./category";

export interface Product {
  name: string;
  category: Category;
  description: string;
  price: number;
  image: string;

}