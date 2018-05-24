import {Component} from '@angular/core';
import {IonicPage, Modal, ModalController} from 'ionic-angular';
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
    let myModal: Modal = this.modal.create(ModalPage.name, {name: productName});
    myModal.present();
  }

}
