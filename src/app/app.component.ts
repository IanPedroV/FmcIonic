import {Component, ViewChild} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TabsPage} from "../pages/tabs/tabs";
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {ProfilePage} from "../pages/profile/profile";
import {UserServiceProvider} from "../providers/user-service/user-service";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {


  @ViewChild('conteudo') nav: NavController;
  rootPage: any = TabsPage;



  public pageList = [
    {title: 'Login', component: LoginPage, icon: 'lock', showWhenLogged: false},
    {title: 'Registro', component: RegisterPage, icon: 'clipboard', showWhenLogged: false},
    {title: 'Perfil', component: ProfilePage, icon: 'contact', showWhenLogged: true}
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private _userService: UserServiceProvider) {
    platform.ready().then(() => {
      splashScreen.hide();
      statusBar.hide();
    });
  }

  public goToPage(component) {
    this.nav.push(component);
  }

  getUser() {
    return this._userService.user;
  }

  getFilteredPages(showWhenLogged: boolean) {
    return this.pageList.filter(page => page.showWhenLogged === showWhenLogged);
  }

  public static getFormatedDate(date: Date) {
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() + " " + date.getHours() + ":"
      + date.getMinutes() + ":" + date.getSeconds();
  };
}
