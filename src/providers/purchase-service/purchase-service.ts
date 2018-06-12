import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Purchase} from "../../models/purchase";

@Injectable()
export class PurchaseServiceProvider {

  constructor(private _http: HttpClient) {

  }

  list() {
    return this._http.get<any[]>('http://192.168.15.13:3000/purchases');
  }

  get(id: number) {
    return this._http.get<any[]>('http://192.168.15.13:3000/purchases/purchase/' + id);

  }

  create(purchase: Purchase) {
    this._http.post('http://192.168.15.13:3000/purchases/purchase', purchase);
  }

  update(purchase: Purchase) {
    this._http.put('http://192.168.15.13:3000/purchases/purchase', purchase);
  }

}