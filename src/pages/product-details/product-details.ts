import {Component} from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';
import {Product} from "../../models/product";
@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
  public product: Product;

  constructor(private viewController: ViewController, public navParams: NavParams) {
    this.product = viewController.data;
  }

  closeModal() {
    this.viewController.dismiss(this.viewController.data);
  }

}
