import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from "../../models/category";
import { MyApp } from '../../app/app.component';

@Injectable()
export class CategoriesServiceProvider {

  constructor(private _http: HttpClient) {
  }

  list() {
    return this._http.get<Category[]>(MyApp.apiUrl + '/categories');
  }

}
