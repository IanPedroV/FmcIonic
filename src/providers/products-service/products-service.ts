import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Product} from "../../models/product";
import { MyApp } from '../../app/app.component';

@Injectable()
export class ProductsServiceProvider {
  public products: Array<Product>;

  constructor(private _http: HttpClient) {
    this.list().subscribe((products: Array<Product>) => {
      this.products = products;
    });
  }

  list() {
    return this._http.get<Product[]>(MyApp.apiUrl +'/products');
  }

}
