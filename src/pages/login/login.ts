import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TabsPage} from "../tabs/tabs";
import {LoginDaoProvider} from "../../providers/user-dao/login-dao";
import {ProductsServiceProvider} from "../../providers/products-service/products-service";
import {Product} from "../../models/product";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email: string;
  password: string;

  validations_form = new FormGroup({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email,
    ])),
    password: new FormControl('', Validators.compose([
      Validators.minLength(8),
      Validators.maxLength(25),
      Validators.required,
    ]))
  });

  constructor(private _alertCtrl: AlertController, private _userService: UserServiceProvider, private _loadingController:
                LoadingController, private _navController: NavController, private _toastController: ToastController,
              private _navParams: NavParams, private _loginDao: LoginDaoProvider, private _productService: ProductsServiceProvider) {
  }

  login() {
    let loading = this._loadingController.create({content: "Realizando login..."});
    loading.present();
    this._userService.login(this.email, this.password).subscribe((result) => {
      loading.dismiss();
      this._loginDao.save(result['user'][0].email, result['user'][0].passwordHash);
      this._userService.user = result['user'][0];

      result['purchaseList'].forEach(purchase => purchase.product = this._productService.products.find(product =>
        product.id === purchase.productId));
      this._userService.user.purchaseList = result['purchaseList'];

      if (Object.keys(this._navParams['data']).length === 0) {
        this._navController.setRoot(TabsPage);
      } else {
        this._navController.pop();
      }
      this._toastController.create({
        message: 'Logado com sucesso!',
        duration: 3000
      }).present();
    }, (error) => {
      loading.dismiss();
      this._alertCtrl.create({
        title: "Erro no login",
        message: error['error'],
        buttons: ['OK']
      }).present();
    });
  }

  isInvalid() {
    return this.validations_form.invalid;
  }

  isFieldInvalid(name: string) {
    return this.validations_form.controls[name].invalid;
  }


}
