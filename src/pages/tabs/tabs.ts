import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {HomePage} from '../home/home';
import {ProductsPage} from "../products/products";
import {FeedPage} from "../feed/feed";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root: any = HomePage;
  tab2Root: any = ProductsPage;
  tab3Root: any = FeedPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
