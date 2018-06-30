import {Component} from '@angular/core';
import {IonicPage, ViewController} from 'ionic-angular';
import {Purchase} from "../../models/purchase";
import {DateFormatter} from "../../utils/dateFormatter";

@IonicPage()
@Component({
  selector: 'page-purchase-details',
  templateUrl: 'purchase-details.html',
})
export class PurchaseDetailsPage {
  purchase: Purchase;

  constructor(private viewController: ViewController) {
    this.purchase = viewController.data;
  }

  closeModal() {
    this.viewController.dismiss(this.viewController.data);
  }

  formatPurchaseDate(){
    return DateFormatter.formatDate(this.purchase.purchaseTimeMillis);
}


}
