import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TabsPage} from "../tabs/tabs";

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

  constructor(public alertCtrl: AlertController, private _userService: UserServiceProvider, private _loadingController:
                LoadingController, private _navController: NavController, private _toastController: ToastController,
              private _navParams: NavParams) {
  }

  login() {
    let user = {email: this.email, password: this.password};
    let loading = this._loadingController.create({content: "Realizando login..."});
    loading.present();
    this._userService.login(user).subscribe((result) => {
      loading.dismiss();
      this._userService.user = result[0];
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
      this.alertCtrl.create({
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
