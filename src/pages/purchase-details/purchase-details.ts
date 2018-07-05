import {Component} from '@angular/core';
import {IonicPage, ViewController} from 'ionic-angular';
import {DateFormatter} from "../../utils/dateFormatter";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import "rxjs/add/observable/interval";

@IonicPage()
@Component({
  selector: 'page-purchase-details',
  templateUrl: 'purchase-details.html',
})
export class PurchaseDetailsPage {
  purchase: any;

  constructor(private viewController: ViewController, private _userService: UserServiceProvider) {
    this.purchase = this._userService.user.purchaseList.find(p => p.orderId === this.viewController.data.orderId);

  }

  // ionViewDidLoad() {
  //   this.purchase = this._userService.user.purchaseList.find(p => p.orderId === this.viewController.data.orderId);
  // }

  closeModal() {
    this.viewController.dismiss(this.viewController.data);
  }

  formatPurchaseDate() {
    return DateFormatter.formatMillisecondsToDate(this.purchase.purchaseTimeMillis);
  }

  test() {
    console.log(this.purchase);
    console.log(this._userService.user.purchaseList.find(p => p.orderId === this.viewController.data.orderId));
  }

}
