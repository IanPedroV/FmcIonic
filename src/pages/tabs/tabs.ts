import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {ProductsPage} from "../products/products";
import {FeedPage} from "../feed/feed";
import {MysteryCardsPage} from "../mystery-cards/mystery-cards";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root: any = FeedPage.name;
  tab2Root: any = MysteryCardsPage.name;
  tab3Root: any = ProductsPage.name;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
