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
    store.validator = ((data, callback) => {
      this._purchaseService.verify(data).subscribe((response) => callback(response['verified'], response['transaction']));
    });

    this._productsService.list().subscribe(productsFromAPI => productsFromAPI.forEach((productFromAPI: Product) => {
      product = {
        id: productFromAPI.id.toString(),
        alias: productFromAPI.id.toString(),
        type: "consumable"
      };

      store.when(productFromAPI.id).verified((order) => {
        let purchase = IapServiceProvider.orderToPurchase(order, "VERIFICADA", 0, 0);
        this._purchaseService.update(purchase).subscribe(() => {
        });
        console.log("VERIFYING");
        order.finish();
      });

      store.when(productFromAPI.id).finished((order) => {
        let purchase = IapServiceProvider.orderToPurchase(order, "APROVADA", 1, 0);
        this._purchaseService.update(purchase).subscribe(() => {
        console.log("FINISHING");
        });
      });

      store.when(productFromAPI.id).approved((order) => {
        order.verify();
        let purchase = IapServiceProvider.orderToPurchase(order, "PROCESSANDO", 0, 0);
        console.log("APPROVING");
        this._purchaseService.create(purchase).subscribe(() => {
        });
        // this.updateProducts();
      });

      store.when(productFromAPI.id).updated(() => {
        // this.updateProducts();
      });

      store.when(productFromAPI.id).owned(() => {
        // Product owned
        // this.updateProducts();
      });

      store.when(productFromAPI.id).refunded(() => {
        // this.updateProducts();
      });

      store.when(productFromAPI.id).cancelled(() => {
        // console.log(data['additionalData'].pocketNick);
        // this.updateProducts();
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
      // this.updateProducts();
    });
    store.refresh();
  }


  // updateProducts() {
  //   if (store)
  //     if (store.hasOwnProperty('products'))
  //       this.productArr = store.products;
  // }

  static getStore() {
    return store;
  }

  static orderToPurchase(order, status, consumptionState, purchaseState) {
    let transaction = order.transaction;
    let receipt = JSON.parse(order.transaction.receipt);
    let purchase = {
      productId: order.id,
      userId: order.additionalData.userId,
      userNick: order.additionalData.pocketNick,
      paymentMethod: "Google Play",
      status: status,
      token: transaction.purchaseToken,
      signature: transaction.signature,
      purchaseTimeMillis: receipt.purchaseTime,
      purchaseState: purchaseState,
      consumptionState: consumptionState,
      orderId: transaction.id,
      purchaseType: null
    };
    console.log(purchase);
    return purchase;
  }


}
