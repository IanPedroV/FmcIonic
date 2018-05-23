import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import {ProductsPage} from "../products/products";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
  export class TabsPage {
  tab1Root: any = ProductsPage;
  tab2Root: any = HomePage;
  tab3Root: any = HomePage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
