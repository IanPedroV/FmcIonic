import {Component} from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import {ProductsPage} from "../products/products";
import {FeedPage} from "../feed/feed";
import {MysteryCardsPage} from "../mystery-cards/mystery-cards";
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root: any = ProductsPage;
  tab2Root: any = MysteryCardsPage;
  tab3Root: any = FeedPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
