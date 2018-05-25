import {Component, ViewChild} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TabsPage} from "../pages/tabs/tabs";
import {LoginPage} from "../pages/login/login";
import {FeedPage} from "../pages/feed/feed";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('conteudo') nav: NavController;
  rootPage: any = TabsPage;
  logado = false;

  public pageList = [
    {title: 'Login', component: LoginPage.name, icon: 'contact'},
    {title: 'Cadastro', component: FeedPage.name, icon: 'clipboard'}
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
