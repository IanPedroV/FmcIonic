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
  public user;

  constructor(private modal: ModalController, private viewController: ViewController, private _userService: UserServiceProvider) {
    this.user = this._userService.user;
  }

  showProductDetails(purchase: Purchase) {
    let myModal: Modal = this.modal.create(PurchaseDetailsPage.name, purchase);
    myModal.present();
  }

  closeModal() {
    this.viewController.dismiss(this.viewController.data);
  }
}
