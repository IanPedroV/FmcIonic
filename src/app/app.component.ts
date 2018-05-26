import {Component, ViewChild} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TabsPage} from "../pages/tabs/tabs";
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {ProfilePage} from "../pages/profile/profile";
import {User} from "../models/user";
import {ProductsPage} from "../pages/products/products";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('conteudo') nav: NavController;
  rootPage: any = TabsPage;
  user: User = {
    email: 'user@user.com',
    password: '123456',
    pocketNick: 'user',
    pcNick: 'user',
    verifiedPocketNick: false,
    verifiedPcNick: false,
    purchaseList: [{
      date: '01/05/1998',
      paymentMethod: 'Google Pay',
      product: {
        name: 'VIP Lendário',
        category: ProductsPage.categoryList[0],
        description: 'Teste',
        features: ['5 caixas misteriosas', 'Slot Reservado', '15 Efeitos', '10 cores de chat', '5000 moedas', '10000 XP'],
        price: 10,
        image: 'https://dunb17ur4ymx4.cloudfront.net/packages/images/2371470d77ce816fef4f21ec773ab0836f6d874d.png'
      }
    },
      {
        date: '05/01/2012',
        paymentMethod: 'Google Pay',
        product: {
          name: 'Kit Refletz',
          category: ProductsPage.categoryList[1],
          description: 'Teste',
          features: ['5 caixas misteriosas', 'Slot Reservado', '15 Efeitos', '10 cores de chat', '5000 moedas', '10000 XP'],
          price: 30,
          image: 'https://dunb17ur4ymx4.cloudfront.net/packages/images/2670dd47b99146ce668c11ce774ff0d405b4ef59.png'
        }
      },
      {
        date: '03/09/2017',
        paymentMethod: 'Google Pay',
        product: {
          name: 'Kit Spok',
          category: ProductsPage.categoryList[2],
          description: 'Teste',
          features: ['5 caixas misteriosas', 'Slot Reservado', '15 Efeitos', '10 cores de chat', '5000 moedas', '10000 XP'],
          price: 30,
          image: 'https://dunb17ur4ymx4.cloudfront.net/packages/images/a60c777edace2a14a3be41fd99af974adfc4f001.png'
        }
      }]
  };

  public pageList = [
    {title: 'Login', component: LoginPage.name, icon: 'lock'},
    {title: 'Registro', component: RegisterPage.name, icon: 'clipboard'},
    {title: 'Perfil', component: ProfilePage.name, icon: 'contact'}
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      splashScreen.hide();
      statusBar.hide();
    });
  }

  public goToPage(component) {
    console.log('Chamando goToPage() para abrir: ' + component);
    this.nav.push(component);
  }
}
