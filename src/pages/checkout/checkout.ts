import {Component} from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import {Product} from "../../models/product";

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  private _product: Product;

  constructor(private _navParams: NavParams) {
    this._product = _navParams['data'];
  }

  ionViewDidLoad() {
    console.log(this._product);
  }

}
