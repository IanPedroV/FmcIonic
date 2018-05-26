import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {Product} from "../../models/product";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public product: Product;

  constructor(private toastCtrl: ToastController, private viewController: ViewController, public navCtrl: NavController, public navParams: NavParams) {
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

  closeModal() {
    this.viewController.dismiss(this.viewController.data);
  }
}
