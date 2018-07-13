import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductsServiceProvider } from "../products-service/products-service";
import { ArraySorter } from "../../utils/arraySorter";
import { MyApp } from '../../app/app.component';
import { UserServiceProvider } from '../user-service/user-service';
import { Observable } from '../../../node_modules/rxjs/Observable';

@Injectable()
export class PurchaseServiceProvider {

  constructor(private _http: HttpClient, private _userService: UserServiceProvider) {

  }

  create(purchase): Observable<any> {
    return this._userService.getToken().map((token) => {
      let headers = new HttpHeaders().set('Authorization', token);
      return this._http.post(MyApp.apiUrl + '/purchases/purchase', purchase,
        { headers: headers, observe: "response" });
    });
  }

  verify(data) {
    return this._http.post(MyApp.apiUrl + '/purchases/verify', data);
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
