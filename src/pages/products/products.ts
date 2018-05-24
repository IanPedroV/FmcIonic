import {Component} from '@angular/core';
import {IonicPage, ModalController} from 'ionic-angular';
import {ModalPage} from "../modal/modal";

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  category: string = 'vips';

  constructor(private modal: ModalController) {
  }

  showDetails(productName: string) {
   // if (productName == 'VIP Lendário') {
      const myModal = this.modal.create(ModalPage.name);
      myModal.present();
    //}
  }

}
