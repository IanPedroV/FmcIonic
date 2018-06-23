import {Category} from "./category";
import {Commands} from "./commands";

export interface Product {
  id: number,
  type: string,
  name: string,
  category: Category,
  description: string,
  features: string,
  price: number,
  image: string,
  commands: Commands
}
