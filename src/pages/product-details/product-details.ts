import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, ViewController} from 'ionic-angular';
import {Product} from "../../models/product";
import {IapServiceProvider} from "../../providers/iap-service/iap-service";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {LoginPage} from "../login/login";

@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
  public product: Product;

  constructor(private viewController: ViewController, private _loadingCtrl: LoadingController, private _alertController:
                AlertController, private _userService: UserServiceProvider, private _navController: NavController) {
    this.product = viewController.data;
  }

  closeModal() {
    this.viewController.dismiss(this.viewController.data);
  }

  checkout() {
    if (!this._userService.user) {
      const prompt = this._alertController.create({
        title: 'Compra sem Login',
        message: "Como você não está logado, informe seu nick do pocket que este pacote será liberado, ou" +
        " faça login.",
        cssClass: 'buttonCss',
        inputs: [
          {
            name: 'nick',
            placeholder: 'Nick no Pocket'
          },
        ],
        buttons: [
          {
            text: 'Logar',
            handler: () => {
              this._navController.push(LoginPage, {product: this.product});
            }
          },
          {
            cssClass: 'warning-button',
            text: 'Comprar como Visitante',
            handler: data => {
              this.buy(data.nick);
            }
          }
        ]
      });
      prompt.present();
    } else {
      this.buy(null);
    }
  }

  buy(pocketNick) {
    let loading = this._loadingCtrl.create({content: 'Concluindo compra...'});
    loading.present();
    IapServiceProvider.getStore().order(this.product.id.toString(), {pocketNick: pocketNick}).then(() => loading.dismiss());
  }

}
