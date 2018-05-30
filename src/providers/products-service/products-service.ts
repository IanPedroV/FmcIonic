import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class ProductsServiceProvider {

  constructor(private _http: HttpClient) {
  }

  list() {
    return this._http.get<any[]>('http://localhost:3000/produtos');
  }

}
