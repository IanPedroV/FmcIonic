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

  getPurchase(id: number) {
    return this._http.get<any[]>('http://192.168.15.13:3000/purchases/purchase');

  }

  createPurchase(purchase: Purchase) {
    this._http.post('http://192.168.15.13:3000/purchases/purchase', purchase);

  }

  updatePurchase(purchase: Purchase) {
    this._http.put('http://192.168.15.13:3000/purchases/purchase', purchase);
  }

}
