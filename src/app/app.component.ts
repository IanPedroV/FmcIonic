import {Component, ViewChild} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TabsPage} from "../pages/tabs/tabs";
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {ProfilePage} from "../pages/profile/profile";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('conteudo') nav: NavController;
  rootPage: any = TabsPage;
  logado = false;

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
