import {Component} from '@angular/core';
import {IonicPage, Modal, ModalController, ViewController} from 'ionic-angular';
import {PurchaseDetailsPage} from "../purchase-details/purchase-details";
import {Purchase} from "../../models/purchase";
import {UserServiceProvider} from "../../providers/user-service/user-service";

@IonicPage()
@Component({
  selector: 'page-purchase-history',
  templateUrl: 'purchase-history.html',
})
export class PurchaseHistoryPage {
  private readonly _purchases: Array<Purchase> = [];

  constructor(private modal: ModalController, private viewController: ViewController, private _userService: UserServiceProvider) {
    this._purchases = this._userService.user.purchaseList;
  }

  showProductDetails(purchase: Purchase) {
    let myModal: Modal = this.modal.create(PurchaseDetailsPage, purchase);
    myModal.present();
  }

  closeModal() {
    this.viewController.dismiss(this.viewController.data);
  }

  getPurchases() {
    return this._purchases;
  }
}
