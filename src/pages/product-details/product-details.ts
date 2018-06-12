import {Component} from '@angular/core';
import {IonicPage, LoadingController, ViewController} from 'ionic-angular';
import {Product} from "../../models/product";
import {IapServiceProvider} from "../../providers/iap-service/iap-service";

@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
  public product: Product;

  constructor(private viewController: ViewController, private _loadingCtrl: LoadingController, private iapService: IapServiceProvider) {
    this.product = viewController.data;
  }

  closeModal() {
    this.viewController.dismiss(this.viewController.data);
  }

  checkout() {
    let loading = this._loadingCtrl.create({content: 'Concluindo compra...'});
    loading.present();
    IapServiceProvider.getStore().order(this.product.id.toString()).then(() => loading.dismiss());
  }
}
