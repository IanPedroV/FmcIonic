import {Injectable} from '@angular/core';
import {Platform} from "ionic-angular";
import {IAPProduct} from "@ionic-native/in-app-purchase-2";

declare var store: any;

@Injectable()
export class IapServiceProvider {

  productArr: Array<IAPProduct> = [];

  constructor(public platform: Platform) {
    platform.ready().then(
      () => {
        if (store) {
          this.initProducts();
        }
      }
    )

  }

  initProducts() {

    var products: any = {};
    products['productId'] = {
      id: 'productId',
      alias: "Product Name",
      type: store.NON_CONSUMABLE
    };

    store.error(
      (err) => {
        console.log(err);
      });

    store.when("yourProductIdorAlias").approved((order) => {
      // Product has been purchased.
      this.updateProducts();
      order.finish();
    });

    store.when("yourProductIdorAlias").updated((data) => {
      this.updateProducts();
    });

    store.when("all_features").owned((data) => {
      // Product owned
      this.updateProducts();
    });

    store.when("all_features").refunded((data) => {
      // Do stuff. I don't think refunds work properly tho :(
      this.updateProducts();


    });

    store.when("all_features").cancelled((data) => {
      // Do stuff
      this.updateProducts();
    });

    store.register(products.productId);
    this.initStore();
  }

  initStore() {
    store.verbosity = store.DEBUG;
    store.ready(() => {
      store.get("yourProductIdorAlias");
      this.updateProducts();
    });
    store.refresh();
  }


  updateProducts() {
    if (store) {
      if (store.hasOwnProperty('products')) {
// update your own object to track product status.
// If you want to do it that way, or just use store.products directly.
// e.g.
        this.productArr = store.products;
      }
    }
  }

  buyProduct(productId) {
    store.order(productId).then(() => console.log("Comprando: " + productId));
  }


}
