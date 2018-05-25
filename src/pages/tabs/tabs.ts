import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {ProductsPage} from "../products/products";
import {FeedPage} from "../feed/feed";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root: any = ProductsPage.name;
  tab2Root: any = null;
  tab3Root: any = FeedPage.name;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
