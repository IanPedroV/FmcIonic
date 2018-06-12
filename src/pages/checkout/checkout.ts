import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavParams} from 'ionic-angular';
import {Product} from "../../models/product";
import {IapServiceProvider} from "../../providers/iap-service/iap-service";

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  private _product: Product;

  constructor(private _navParams: NavParams, private _loadingCtrl: LoadingController) {
    this._product = this._navParams['data'];
  }

  buyProduct() {
    let loading = this._loadingCtrl.create({content: 'Concluindo compra...'});
    loading.present();
    IapServiceProvider.getStore().order(this._product.id.toString()).then(() => loading.dismiss());
  }
}
