import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Storage} from '@ionic/storage';
import {UserServiceProvider} from "../user-service/user-service";
import {ToastController} from "ionic-angular";
import {PurchaseSorter} from "../../utils/purchase-sorter";
import {PurchaseServiceProvider} from "../purchase-service/purchase-service";

@Injectable()
export class LoginDaoProvider {

  constructor(private _storage: Storage, private _userService: UserServiceProvider,
              private _toastController: ToastController, private _purchaseService: PurchaseServiceProvider) {
  }

  verify() {
    this.get().subscribe(loginInfo => {
      if (loginInfo) {
        this._userService.login(loginInfo.email, loginInfo.passwordHash).subscribe((result) => {
          this._userService.user = result['user'][0];
          this._purchaseService.assignProducts(result['purchaseList']);
          this._userService.user.purchaseList = result['purchaseList'];
          this._toastController.create({
            message: 'Login verificado com sucesso!',
            duration: 3000
          }).present();
          PurchaseSorter.sortPurchases(this._userService.user.purchaseList);
        }, () => {
          this._toastController.create({
            message: 'Erro ao verificar login, entre novamente!',
            duration: 3000
          }).present();
          this.remove();
        })
      }
    });
  }

  // private assignProducts(purchases: Array<Purchase>) {
  //   this._productService.list().subscribe((products: Array<Product>) => {
  //     purchases.forEach(value => value.product = products.find(value1 => value1.id
  //       === value.productId));
  //   });
  // }

  save(email, passwordHash) {
    let promise = this._storage.set('0', {email, passwordHash});
    return Observable.fromPromise(promise);
  }

  remove() {
    return this._storage.clear();
  }

  get() {
    let promise = this._storage.get('0');
    return Observable.fromPromise(promise);
  }


}