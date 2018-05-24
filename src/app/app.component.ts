import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HomePage} from '../pages/home/home';
import {TabsPage} from "../pages/tabs/tabs";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  public paginas = [
    {titulo: 'Loja', componente: HomePage, icone: 'cash'},
    {titulo: 'Configurações', componente: HomePage, icone: 'settings'}
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      splashScreen.hide();
      statusBar.hide();
    });
  }
}
