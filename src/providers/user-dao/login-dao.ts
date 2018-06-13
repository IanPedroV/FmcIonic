import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Storage} from '@ionic/storage';
import {UserServiceProvider} from "../user-service/user-service";
import {AlertController, ToastController} from "ionic-angular";

@Injectable()
export class LoginDaoProvider {

  constructor(private _storage: Storage, private _userService: UserServiceProvider, private _toastController: ToastController, private _alertCtrl: AlertController,) {
  }

  verify() {
    this.get().subscribe(loginInfo => {
      if (loginInfo) {
        this._userService.login(loginInfo.email, loginInfo.passwordHash).subscribe((result) => {
          this._userService.user = result[0];
          this._toastController.create({
            message: 'Login verificado com sucesso',
            duration: 3000
          }).present();
        }, (error) => {
          this._alertCtrl.create({
            title: "Erro",
            message: error['error'] + " Você provavelmente trocou sua senha e o login não conseguiu ser verificado," +
            " por favor, entre novamente em sua conta!",
            buttons: ['OK']
          }).present();
          this.remove();
        })
      }
    });

  }

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
