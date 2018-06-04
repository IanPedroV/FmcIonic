import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ProductDetailsPage} from './product-details';

@NgModule({
  imports: [
    IonicPageModule.forChild(ProductDetailsPage),
  ],
})
export class ProductDetailsPageModule {
}
