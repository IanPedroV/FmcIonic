import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class ProductsServiceProvider {

  constructor(private _http: HttpClient) {
  }

  list() {
    return this._http.get<any[]>('http://192.168.15.13:3000/produtos');
  }

}
