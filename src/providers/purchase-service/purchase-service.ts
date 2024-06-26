import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductsServiceProvider } from "../products-service/products-service";
import { ArraySorter } from "../../utils/arraySorter";
import { MyApp } from '../../app/app.component';
import { UserServiceProvider } from '../user-service/user-service';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { map } from 'rxjs/operator/map';

@Injectable()
export class PurchaseServiceProvider {

  constructor(private _http: HttpClient, private _userService: UserServiceProvider) {

  }

  create(purchase): Observable<any> {
    if (this._userService.user !== undefined) {
      return this._userService.getToken().map((token) => {
        let headers = new HttpHeaders().set('Authorization', token);
        return this._http.post(MyApp.apiUrl + '/purchases/purchase',
          { purchase: purchase },
          { headers: headers, observe: "response" });
      });
    } else {
      let headers = new HttpHeaders().set('Authorization', "isGuest");
      return Observable.of(this._http.post(MyApp.apiUrl + '/purchases/purchase',
        { purchase: purchase, isGuest: true }, { headers: headers, observe: "response" }));
    }

  }

  get(orderId): Observable<any> {
    console.log("GET ORDER!");
    if (this._userService.user !== undefined) {
      return this._userService.getToken().map((token) => {
        let headers = new HttpHeaders().set('Authorization', token);
        return this._http.get(MyApp.apiUrl + '/purchases/purchase/' + orderId,
          { headers: headers, observe: "response" });
      });
    } else {
      let headers = new HttpHeaders().set('Authorization', "isGuest");
      return Observable.of(this._http.get(MyApp.apiUrl + '/purchases/purchase/' + orderId,
        { headers: headers, observe: "response" }));
    }
  }

  verify(data): Observable<any> {
    console.log("VERIFY ORDER!");
    if (this._userService.user !== undefined) {
      return this._userService.getToken().map((token) => {
        let headers = new HttpHeaders().set('Authorization', token);
        return this._http.post(MyApp.apiUrl + '/purchases/verify', data,
          { headers: headers });
      });
    } else {
      let headers = new HttpHeaders().set('Authorization', 'isGuest');
      return Observable.of(this._http.post(MyApp.apiUrl + '/purchases/verify', data,
        { headers: headers }));
    }
  }

  static assignProduct(purchase, purchases: Array<any>) {
    purchase.product = ProductsServiceProvider.products.find(product => product.id === parseInt(purchase.productId));
    ArraySorter.sortByMillisecondsDate(purchases);
  }

  static assignProducts(purchases: Array<any>) {
    purchases.forEach(purchase => purchase.product = ProductsServiceProvider.products.find(product =>
      product.id === purchase.productId));
    ArraySorter.sortByMillisecondsDate(purchases);
  }


}
