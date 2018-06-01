import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Product} from "../../models/product";

@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
  public product: Product;

  constructor(private viewController: ViewController, private nav: NavController) {
    this.product = viewController.data;
  }

  closeModal() {
    this.viewController.dismiss(this.viewController.data);
  }

  checkout(product: Product) {
    this.nav.push('CheckoutPage', this.product);
  }
}
