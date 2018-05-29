import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Product} from "../../models/product";
@Injectable()
export class ProductsServiceProvider {

  constructor(public _http: HttpClient) {
  }

  list() {
    return this._http.get<Product[]>('http://localhost:3000/produtos');
  }

}
