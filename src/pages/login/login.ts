import {Component} from '@angular/core';
import {AlertController, IonicPage} from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

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

  constructor(public alertCtrl: AlertController, private _userService: UserServiceProvider) {

  }

  login() {
    let user = {email: this.email, password: this.password};
    this._userService.login(user).subscribe((result) => {
      console.log("sucesso no login!");
      this._userService.user = result[0];
    }, (error) => {
      console.log("erro no login!");
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
