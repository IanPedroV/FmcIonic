import {Component} from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';
import {Product} from "../../models/product";

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  public product: Product;

  constructor(private viewController: ViewController, public navParams: NavParams) {
    this.product = viewController.data;
  }

  closeModal() {
    this.viewController.dismiss(this.viewController.data);
  }

}
