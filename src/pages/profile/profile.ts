import {Component} from '@angular/core';
import {IonicPage, Modal, ModalController, ToastController, ViewController} from 'ionic-angular';
import {Product} from "../../models/product";
import {PurchaseHistoryPage} from "../purchase-history/purchase-history";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public product: Product;

  constructor(private toastCtrl: ToastController, private viewController: ViewController, private modal: ModalController) {
    this.product = viewController.data;
  }

  showToast(message: string, closeButton: string) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 5000,
      showCloseButton: true,
      closeButtonText: closeButton,
    });
    toast.present();
  }

  showPurchaseHistory(user) {
    let myModal: Modal = this.modal.create(PurchaseHistoryPage.name);
    myModal.present();
  }

  closeModal() {
    this.viewController.dismiss(this.viewController.data);
  }
}
