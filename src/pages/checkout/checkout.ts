import {Component} from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import {Product} from "../../models/product";
import {IAPProduct, InAppPurchase2} from "@ionic-native/in-app-purchase-2";

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  private _product: Product;
  private _store: InAppPurchase2;

  constructor(private _navParams: NavParams, private store: InAppPurchase2) {
    this._product = this._navParams['data'];
    this.store.ready().then(() => {
      this._store = store;
      this.store.verbosity = this.store.DEBUG;
      this.store.register({
        id: "1",
        alias: "1",
        type: this.store.NON_RENEWING_SUBSCRIPTION
      });
      this.store.when("1").registered((product: IAPProduct) => {
        console.log('Registered: ' + JSON.stringify(product));
      });
    });
  }

  ionViewDidLoad() {
    console.log(this._product);
  }

  buyProduct() {
    this._store.order("1");
  }
}
