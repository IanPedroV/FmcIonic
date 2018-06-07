import {Injectable} from '@angular/core';
import {Platform} from "ionic-angular";
import {IAPProduct} from "@ionic-native/in-app-purchase-2";
import {ProductsServiceProvider} from "../products-service/products-service";
import {Product} from "../../models/product";
import {PurchaseServiceProvider} from "../purchase-service/purchase-service";

declare var store: any;

@Injectable()
export class IapServiceProvider {
  productArr: Array<IAPProduct> = [];

  constructor(public platform: Platform, private _productsService: ProductsServiceProvider, private _purchaseService:
    PurchaseServiceProvider) {
    platform.ready().then(() => {
        if (store)
          this.initProducts();
      }
    )
  }

  initProducts() {
    let product: any = {};

    this._productsService.list().subscribe(productsFromAPI => productsFromAPI.forEach((productFromAPI: Product) => {
      product = {
        id: productFromAPI.id.toString(),
        alias: productFromAPI.id.toString(),
        type: "consumable"
      };

      store.when(productFromAPI.id).approved((order) => {
        // Product has been purchased.
        this.updateProducts();
        order.finish();
      });

      store.when(productFromAPI.id).updated((data) => {
        this.updateProducts();
      });

      store.when(productFromAPI.id).owned((data) => {
        // Product owned
        this.updateProducts();
      });

      store.when(productFromAPI.id).refunded((data) => {
        // Do stuff. I don't think refunds work properly tho :(
        this.updateProducts();

      });

      store.when(productFromAPI.id).cancelled((data) => {
        this.updateProducts();
      });
      console.log(product);
      store.register(product);
    }));

    store.error((err) => console.log(err));
    this.initStore();
  }

  initStore() {
    store.verbosity = store.DEBUG;
    store.ready(() => {
      this.updateProducts();
    });
    store.refresh();
  }


  updateProducts() {
    if (store)
      if (store.hasOwnProperty('products'))
        this.productArr = store.products;
  }

  static getStore() {
    return store;
  }


}
