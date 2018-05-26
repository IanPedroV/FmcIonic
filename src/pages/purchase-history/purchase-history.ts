import {Component} from '@angular/core';
import {IonicPage, Modal, ModalController, ViewController} from 'ionic-angular';
import {MyApp} from "../../app/app.component";
import {PurchaseDetailsPage} from "../purchase-details/purchase-details";
import {Purchase} from "../../models/purchase";

/**
 * Generated class for the PurchaseHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-purchase-history',
  templateUrl: 'purchase-history.html',
})
export class PurchaseHistoryPage {

  constructor(private modal: ModalController, private viewController: ViewController) {
  }

  showProductDetails(purchase: Purchase) {
    let myModal: Modal = this.modal.create(PurchaseDetailsPage.name, purchase);
    myModal.present();
  }

  getPurchasedProducts() {
    return MyApp.user.purchaseList;
  }

  closeModal() {
    this.viewController.dismiss(this.viewController.data);
  }
}
