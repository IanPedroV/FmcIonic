import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Storage} from '@ionic/storage';
import {UserServiceProvider} from "../user-service/user-service";
import {ToastController} from "ionic-angular";
import {ProductsServiceProvider} from "../products-service/products-service";

@Injectable()
export class LoginDaoProvider {

  constructor(private _storage: Storage, private _userService: UserServiceProvider,
              private _toastController: ToastController, private _productService: ProductsServiceProvider) {
  }

  verify() {
    this.get().subscribe(loginInfo => {
      if (loginInfo) {
        this._userService.login(loginInfo.email, loginInfo.passwordHash).subscribe((result) => {
          this._userService.user = result['user'][0];

          result['purchaseList'].forEach(purchase => purchase.product = this._productService.products.find(
            product => product.id === purchase.productId));
          this._userService.user.purchaseList = result['purchaseList'];

          this._toastController.create({
            message: 'Login verificado com sucesso!',
            duration: 3000
          }).present();
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
    this._storage.remove('0');
  }

  get() {
    let promise = this._storage.get('0');
    return Observable.fromPromise(promise);
  }


}
