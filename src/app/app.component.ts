import { Component, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from "../pages/tabs/tabs";
import { LoginPage } from "../pages/login/login";
import { RegisterPage } from "../pages/register/register";
import { ProfilePage } from "../pages/profile/profile";
import { UserServiceProvider } from "../providers/user-service/user-service";
import { OneSignal } from "@ionic-native/onesignal";
import { timer } from "rxjs/observable/timer"

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('conteudo') nav: NavController;
  rootPage: any = TabsPage;
  sub: any;
  static apiUrl = "https://familiacraft.com";
  static loginRedirectUrl = "https://pocket.familiacraft.com";

  public pageList = [
    { title: 'Login', component: LoginPage, icon: 'lock', showWhenLogged: false },
    { title: 'Registro', component: RegisterPage, icon: 'clipboard', showWhenLogged: false },
    { title: 'Perfil', component: ProfilePage, icon: 'contact', showWhenLogged: true }
  ];

  showSplash = true;

  constructor(private _platform: Platform, private _statusBar: StatusBar,
    private _splashScreen: SplashScreen, private _userService: UserServiceProvider, public oneSignal: OneSignal) {
    this.initializeApp();
  }

  initializeApp() {
    this._platform.ready().then(() => {
      this._splashScreen.hide();
      this._statusBar.hide();
      timer(1500).subscribe(() => this.showSplash = false);
      this._userService.verifyLogin();
      if (this._platform.is('android')) {
        this.oneSignal.startInit("ae0983be-3d3a-42f7-a3be-22deb76d1d32", "AAAAIz0mLSU:APA91bH_dFjiwLAtZUIpUhsZZ3d020IWYcFwdt7D_Z6TYNSyDJhFTH3mOdkfTVOuZw2mQ9gByU6OPVfBmS_U5V15q_BPGueJbjLd1D0jnUu3pNktXSzvwqtQpQZsJBYmQB3HRntMDVaGLYho8P9DAlYt1C1lOvs4xw");
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        this.oneSignal.handleNotificationReceived().subscribe(data => {
          console.log("Dados do Push", data);
        });
        this.oneSignal.handleNotificationOpened().subscribe(data => {
          console.log("Dados do Push", data);
        });
        this.oneSignal.endInit();
      }
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
