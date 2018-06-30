import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from "../../models/user";
import {PurchaseServiceProvider} from "../purchase-service/purchase-service";
import {Purchase} from "../../models/purchase";

@Injectable()
export class UserServiceProvider {
  private _user: User;

  constructor(private _http: HttpClient, private _purchaseService: PurchaseServiceProvider) {

  }

  create(user) {
    return this._http.post('http://192.168.15.13:3000/users/user/', user);
  }

  login(email, password) {
    return this._http.post('http://192.168.15.13:3000/users/login/', {email, password});
  }

  get(id) {
    return this._http.get('http://192.168.15.13:3000/users/login/' + id);
  }

  get user() {
    return this._user;
  }

  set user(user) {
    this._user = user;
  }

  updatePurchase(purchase) {
    let objIndex = this.user.purchaseList.findIndex((obj => obj.orderId === purchase.orderId));
    this.user.purchaseList[objIndex] = purchase;
    this._purchaseService.assignProduct(this.user.purchaseList[objIndex], this.user.purchaseList);
  }

}
