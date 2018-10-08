import { Component } from '@angular/core';
import { IonicPage, Modal, ModalController, NavController, ToastController, ViewController, AlertController } from 'ionic-angular';
import { Product } from "../../models/product";
import { PurchaseHistoryPage } from "../purchase-history/purchase-history";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { TabsPage } from "../tabs/tabs";
import { LoginDaoProvider } from "../../providers/user-dao/login-dao";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public product: Product;
  public user;

  constructor(private toastCtrl: ToastController, private viewController: ViewController,
    private modal: ModalController, private _userService: UserServiceProvider, private _loginDao: LoginDaoProvider,
    private _navController: NavController, private _alertCtrl: AlertController) {
    this.product = viewController.data;
    this.user = this._userService.user;
  }

  showToast(message: string, closeButton: string) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 5000,
      showCloseButton: true,
      closeButtonText: closeButton,
    });
    toast.present();
  }

  logout() {
    const confirm = this._alertCtrl.create({
      title: 'Confirme Log-out:',
      message: 'Você tem certeza que deseja sair da sua conta?',
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Sim',
          handler: () => {
            this._userService.user = undefined;
            this._loginDao.remove().then(() => {
              this._userService.user = null;
              this._navController.setRoot(TabsPage);
              this.toastCtrl.create({
                message: 'Deslogou com sucesso!',
                duration: 3000
              }).present();
            });
          }
        }
      ]
    });
    confirm.present();
  }


  showPurchaseHistory() {
    let myModal: Modal = this.modal.create(PurchaseHistoryPage);
    myModal.present();
  }

  closeModal() {
    this.viewController.dismiss(this.viewController.data);
  }
}
