import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Category} from "../../models/category";

@Injectable()
export class CategoriesServiceProvider {

  constructor(private _http: HttpClient) {
  }

  list() {
    return this._http.get<Category[]>('http://localhost:3000/categories');
  }

}
