import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {InAppPurchase2} from '@ionic-native/in-app-purchase-2';
import {StatusBar} from '@ionic-native/status-bar';
import {MyApp} from './app.component';
import {TabsPage} from '../pages/tabs/tabs';
import {ProductsServiceProvider} from '../providers/products-service/products-service';
import {HttpClientModule} from "@angular/common/http";
import {CategoriesServiceProvider} from '../providers/categories-service/categories-service';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';
import {IapServiceProvider} from '../providers/iap-service/iap-service';
import {ProductsPage} from "../pages/products/products";
import {MysteryCardsPage} from "../pages/mystery-cards/mystery-cards";
import {FeedPage} from "../pages/feed/feed";
import {ProductDetailsPage} from "../pages/product-details/product-details";
import {PurchaseServiceProvider} from '../providers/purchase-service/purchase-service';
import {TooltipsModule} from "ionic-tooltips";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RegisterPage} from "../pages/register/register";
import {LoginPage} from "../pages/login/login";
import {UserServiceProvider} from '../providers/user-service/user-service';
import {IonicStorageModule} from "@ionic/storage";
import {LoginDaoProvider} from '../providers/user-dao/login-dao';
import {ProfilePage} from "../pages/profile/profile";
import {PurchaseHistoryPage} from "../pages/purchase-history/purchase-history";
import {PurchaseDetailsPage} from "../pages/purchase-details/purchase-details";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ProductsPage,
    MysteryCardsPage,
    FeedPage,
    ProductDetailsPage,
    RegisterPage,
    LoginPage,
    ProfilePage,
    PurchaseHistoryPage,
    PurchaseDetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    BrowserAnimationsModule,
    TooltipsModule,
    IonicStorageModule.forRoot({
      name: 'fmc_ionic',
      storeName: 'login',
      driverOrder: ['indexeddb']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    ProductsPage,
    MysteryCardsPage,
    FeedPage,
    ProductDetailsPage,
    RegisterPage,
    LoginPage,
    ProfilePage,
    PurchaseHistoryPage,
    PurchaseDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppPurchase2,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductsServiceProvider,
    CategoriesServiceProvider,
    IapServiceProvider,
    PurchaseServiceProvider,
    UserServiceProvider,
    LoginDaoProvider,
  ]
})
export class AppModule {
}
