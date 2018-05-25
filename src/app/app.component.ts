import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TabsPage} from "../pages/tabs/tabs";
import {ProductsPage} from "../pages/products/products";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  public paginas = [
    {titulo: 'Loja', componente: TabsPage, icone: 'cash'},
    {titulo: 'Configurações', componente: ProductsPage.name, icone: 'settings'}
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      splashScreen.hide();
      statusBar.hide();
    });
  }
}
