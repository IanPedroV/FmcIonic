import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { DateFormatter } from "../../utils/dateFormatter";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import "rxjs/add/observable/interval";
import { PurchaseServiceProvider } from '../../providers/purchase-service/purchase-service';
import { Purchase } from '../../models/purchase';
import { ProductsServiceProvider } from '../../providers/products-service/products-service';

@IonicPage()
@Component({
  selector: 'page-purchase-details',
  templateUrl: 'purchase-details.html',
})
export class PurchaseDetailsPage {
  purchase: Purchase;

  constructor(private viewController: ViewController, private _userService: UserServiceProvider,
    private _purchaseService: PurchaseServiceProvider, private _navParams: NavParams) {

    if (this._userService.user !== undefined) {
      this.purchase = this._userService.user.purchaseList.find(p => p.orderId === this.viewController.data.orderId);
    } else {
      this.purchase = _navParams.get('purchase');
      this.purchase.product = ProductsServiceProvider.products.find(product => product.id == this.purchase.productId);
      console.log(this.purchase);
    }
  }

  closeModal() {
    this.viewController.dismiss(this.viewController.data);
  }

  formatPurchaseDate() {
    return DateFormatter.formatMillisecondsToDate(this.purchase.purchaseTimeMillis);
  }

  atualizar(refresher) {
    if (this._userService.user !== undefined) {
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
}
