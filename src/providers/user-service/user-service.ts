import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from "../../models/user";
import { PurchaseServiceProvider } from "../purchase-service/purchase-service";
import { MyApp } from '../../app/app.component';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { LoginDaoProvider } from '../user-dao/login-dao';
import { ToastController } from "ionic-angular";
import { ArraySorter } from '../../utils/arraySorter';

@Injectable()
export class UserServiceProvider {
  private _user: User;

  constructor(private _http: HttpClient, private _toastController: ToastController,
    private _loginDao: LoginDaoProvider) {

  }

  create(user) {
    return this._http.post(MyApp.apiUrl + '/users/user/', user);
  }

  login(email, password) {
    return this._http.post(MyApp.apiUrl + '/users/login/', { email, password });
  }

  get(id) {
    return this._http.get(MyApp.apiUrl + '/users/login/' + id);
  }

  validateToken() {
    let headers = new HttpHeaders().set('Authorization', this._user.token);
    return this._http.post(MyApp.apiUrl + '/users/validateToken/',
      { user: this._user },
      {
        headers: headers,
        observe: "response"
      });
  }

  get user() {
    return this._user;
  }

  set user(user) {
    this._user = user;
  }

  verifyLogin() {
    this._loginDao.getStorage().subscribe(loginInfo => {
      if (loginInfo) {
        this.login(loginInfo.email, loginInfo.passwordHash).subscribe((result) => {
          this.user = result['user'];
          PurchaseServiceProvider.assignProducts(result['user'].purchaseList);

          this.getToken().subscribe(() => { });

          this._toastController.create({
            message: 'Login verificado com sucesso!',
            duration: 3000
          }).present();
          ArraySorter.sortByMillisecondsDate(this.user.purchaseList);
        }, () => {
          this._toastController.create({
            message: 'Erro ao verificar login, entre novamente!',
            duration: 3000
          }).present();
          this._loginDao.remove();
        })
      }
    });
  }

  getToken(): Observable<any> {
    return this.validateToken().map((response) => {
      console.log("Token era valida e foi conservada.");
      return this._user.token;
    }).catch((err) => {
      if (err.status === 401) {
        console.log("Token era inválida, porém foi atualizada!");
      } else if (err.status === 403) {
        console.log("Token era inválida, porém as Permissões insuficientes!");

      }
      return this.login(this._user.email, this._user.passwordHash).map((response) => {
        this._user.token = response['user'].token;
        this._loginDao.save(this.user.email, this.user.passwordHash, response['token']);
        return this._user.token;
      });
    });

  }

  updatePurchase(purchase) {
    let objIndex = this.user.purchaseList.findIndex((obj => obj.orderId === purchase.orderId));
    this.user.purchaseList[objIndex] = purchase;
    PurchaseServiceProvider.assignProduct(this.user.purchaseList[objIndex], this.user.purchaseList);
  }

}
