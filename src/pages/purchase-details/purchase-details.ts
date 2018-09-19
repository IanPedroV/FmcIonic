import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { DateFormatter } from "../../utils/dateFormatter";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import "rxjs/add/observable/interval";
import { PurchaseServiceProvider } from '../../providers/purchase-service/purchase-service';

@IonicPage()
@Component({
  selector: 'page-purchase-details',
  templateUrl: 'purchase-details.html',
})
export class PurchaseDetailsPage {
  purchase: any;

  constructor(private viewController: ViewController, private _userService: UserServiceProvider,
    private _purchaseService: PurchaseServiceProvider) {
    this.purchase = this._userService.user.purchaseList.find(p => p.orderId === this.viewController.data.orderId);

  }

  closeModal() {
    this.viewController.dismiss(this.viewController.data);
  }

  formatPurchaseDate() {
    return DateFormatter.formatMillisecondsToDate(this.purchase.purchaseTimeMillis);
  }

  atualizar(refresher) {
    this._purchaseService.get(this.purchase.orderId).mergeMap((getToken) => {
      return getToken;
    }).subscribe((purchaseResponse) => {
      let purchase = purchaseResponse['body'];
      this.purchase = purchase;
      this._userService.updatePurchase(purchase);
      refresher.complete();
    });
  }

}
