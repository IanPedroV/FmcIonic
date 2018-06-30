import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

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

  create(purchase) {
    return this._http.post('http://192.168.15.13:3000/purchases/purchase', purchase);
  }

  update(purchase) {
    return this._http.put('http://192.168.15.13:3000/purchases/purchase/' + purchase.orderId, purchase);
  }

  verify(data) {
    return this._http.post('http://192.168.15.13:3000/purchases/verify', data);
  }

}
