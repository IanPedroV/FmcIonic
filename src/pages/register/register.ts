import {Component} from '@angular/core';
import {AlertController, IonicPage} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {MyApp} from "../../app/app.component";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  email: string;
  pocketNick: string;
  password: string;

  formFields = [
    {title: "Email*", name: "email", type: "text", component: this.email},
    {title: "Nick no pocket*", name: "pocketNick", type: "text", component: this.pocketNick},
    {title: "Nova Senha (min. 8 carac.)", name: "password", type: "password", component: this.password}
  ];


  validations_form = new FormGroup({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email,
    ])),
    pocketNick: new FormControl('', Validators.compose([
      Validators.maxLength(25),
      Validators.minLength(3),
      Validators.required
    ])),
    password: new FormControl('', Validators.compose([
      Validators.minLength(8),
      Validators.maxLength(25),
      Validators.required,
    ]))
  });


  validation_messages = {
    'email': [
      {type: 'required', message: 'E-mail é obrigatório'},
      {type: 'email', message: 'Digite um e-mail válido'},
    ],
    'pocketNick': [
      {type: 'required', message: 'Nick do Pocket é obrigatório'},
      {type: 'minlength', message: 'Nick do Pocket deve conter pelo ao menos 3 caracteres'},
      {type: 'maxlength', message: 'Nick do Pocket não pode ter mais de 25 caracteres'},
    ],
    'password': [
      {type: 'required', message: 'Senha é obrigatória'},
      {type: 'minlength', message: 'Senha deve conter pelo ao menos 8 caracteres'},
      {type: 'maxlength', message: 'Senha não pode ter mais de 25 caracteres'},
    ]
  };

  constructor(public alertCtrl: AlertController, private _userService: UserServiceProvider) {
  }

  isInvalid() {
    return this.validations_form.invalid;
  }

  cadastra() {
    console.log("Tentando cadastrar: " + this.email + " | " + this.pocketNick + " | " + this.password);
    let user = {
      email: this.email,
      password: this.password,
      avatar: "https://www.drupal.org/files/issues/default-avatar.png",
      pocketNick: this.pocketNick,
      pcNick: null,
      isEmailVerified: false,
      isPocketNickVerified: false,
      isPcNickVerified: false,
      ip: "123123123",
      lastLogin: MyApp.getFormatedDate(new Date()),
    };

    console.log(user);

    this._userService.create(user).subscribe((success) => {

      this.alertCtrl.create({
        title: "Sucesso no cadastro",
        message: "Usuário " + this.email + " cadastrado com sucesso! Verifique seu e-mail para confirma-lo!",
        buttons: ['OK']
      }).present();

    }, (error => {
      this.alertCtrl.create({
        title: "Erro no cadastro",
        message: "Erro no cadastro: " + error['error'],
        buttons: ['OK']
      }).present();
    }));
  }

  isFieldInvalid(name: string) {
    return this.validations_form.controls[name].invalid;
  }

}
