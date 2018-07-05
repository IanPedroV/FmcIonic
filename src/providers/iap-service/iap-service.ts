import {Injectable} from '@angular/core';
import {ModalController, Platform} from "ionic-angular";
import {ProductsServiceProvider} from "../products-service/products-service";
import {Product} from "../../models/product";
import {PurchaseServiceProvider} from "../purchase-service/purchase-service";
import {UserServiceProvider} from "../user-service/user-service";
import {Purchase} from "../../models/purchase";
import {PurchaseDetailsPage} from "../../pages/purchase-details/purchase-details";

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
      this._purchaseService.verify(data).subscribe((response) => callback(response['verified'], response['transaction']));
    });

    this._productsService.list().subscribe(productsFromAPI => productsFromAPI.forEach((productFromAPI: Product) => {
      product = {
        id: productFromAPI.id.toString(),
        alias: productFromAPI.id.toString(),
        type: productFromAPI.type
      };

      store.when(productFromAPI.id).approved((order) => {
        console.log("APPROVING");
        order.verify();
        let purchase = this.orderToPurchase(order, "APROVADA", 0, 0);
        this._purchaseService.create(purchase).subscribe((purchase: Purchase) => {
          this._userService.user.purchaseList.push(purchase);
          this._purchaseService.assignProduct(purchase, this._userService.user.purchaseList);
          this.modalController.create(PurchaseDetailsPage, purchase).present();
          // this._alertCtrl.create({
          //   title: "SUCESSO!",
          //   message: "Parabéns pela sua compra! A mesma foi realizada com sucesso.",
          //   buttons: [
          //     {
          //       text: 'Ver compra',
          //       handler: () => {
          //         this.modalController.create(PurchaseDetailsPage, purchase).present();
          //       }
          //     },
          //   ]
          // }).present();
        });

      });

      store.when(productFromAPI.id).verified((order) => {
        let purchase = this.orderToPurchase(order, "VERIFICADA", 0, 0);
        this._purchaseService.update(purchase).subscribe((purchase) => {
          console.log("VERIFYING");
          this._userService.updatePurchase(purchase);
        });
        order.finish();
      });

      store.when(productFromAPI.id).finished((order) => {
        let purchase = this.orderToPurchase(order, "AGUARDANDO LIBERACAO", 1, 0);
        this._purchaseService.update(purchase).subscribe((purchase) => {
          console.log("FINISHING");
          this._userService.updatePurchase(purchase);
        });
      });

      store.when(productFromAPI.id).refunded(() => {
      });

      store.when(productFromAPI.id).cancelled(() => {
        // console.log(data['additionalData'].pocketNick);
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
      userNick: order['additionalData'] ? order['additionalData'].pocketNick : null,
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
