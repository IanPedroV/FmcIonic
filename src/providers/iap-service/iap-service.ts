import { Injectable } from '@angular/core';
import { ModalController, Platform } from "ionic-angular";
import { ProductsServiceProvider } from "../products-service/products-service";
import { Product } from "../../models/product";
import { PurchaseServiceProvider } from "../purchase-service/purchase-service";
import { UserServiceProvider } from "../user-service/user-service";
import { PurchaseDetailsPage } from "../../pages/purchase-details/purchase-details";

declare var store: any;

@Injectable()
export class IapServiceProvider {

  constructor(public platform: Platform, private _productsService: ProductsServiceProvider, private _purchaseService:
    PurchaseServiceProvider, private _userService: UserServiceProvider, private modalController: ModalController) {
    platform.ready().then(() => {
      if (store)
        this.initProducts();
    }
    )
  }

  initProducts() {
    let product: any = {};

    store.validator = ((data, callback) => {
      this._purchaseService.verify(data).mergeMap((getToken) => {
        return getToken;
      }).subscribe(response => {
        console.log('SUCESSO NA PROMISE!');
        callback(response['verified'], response['transaction']);
      });
    });

    this._productsService.list().subscribe(productsFromAPI => productsFromAPI.forEach((productFromAPI: Product) => {
      product = {
        id: productFromAPI.id.toString(),
        alias: productFromAPI.id.toString(),
        type: productFromAPI.type
      };

      store.when(productFromAPI.id).approved((order) => {
        console.log("WILL VERIFY");
        order.verify();
        let purchase = this.orderToPurchase(order, "APROVADA", 0, 0);

        this._purchaseService.create(purchase).mergeMap((getToken) => {
          return getToken;
        }).subscribe((purchaseResponse) => {
          let purchase = purchaseResponse['body'];
          console.log("Debug 1");
          console.log(purchase);
          if (this._userService.user !== undefined) {
            this._userService.user.purchaseList.push(purchase);
            PurchaseServiceProvider.assignProduct(purchase, this._userService.user.purchaseList);
          }
          this.modalController.create(PurchaseDetailsPage, { purchase: purchase }).present();
        });
      });

      store.when(productFromAPI.id).verified((order) => {
        console.log("VERIFYING");
        order.finish();
      });

      store.when(productFromAPI.id).finished((order) => {
        console.log("FINISHING");
      });

      store.when(productFromAPI.id).refunded(() => {
      });

      store.when(productFromAPI.id).cancelled(() => {
      });

      store.when(productFromAPI.id).expired((order) => {
        console.log(order.id + " está expirada!");
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
      console.log("STORE READY!")
    });
    store.refresh();
  }


  static getStore() {
    return store;
  }

  orderToPurchase(order, status, consumptionState, purchaseState) {
    console.log(order);
    let transaction = order.transaction;
    let receipt = JSON.parse(order.transaction.receipt);
    let purchase = {
      productId: order.id,
      userId: this._userService.user ? this._userService.user.id : null,
      userNick: order['additionalData'] ? order['additionalData'].pocketNick : (this._userService.user ? this._userService.user.pocketNick : null),
      paymentMethod: "Google Play",
      status: status,
      token: transaction.purchaseToken,
      signature: transaction.signature,
      purchaseTimeMillis: receipt.purchaseTime,
      purchaseState: purchaseState,
      consumptionState: consumptionState,
      orderId: transaction.id
    };
    console.log(purchase);
    return purchase;
  }


}