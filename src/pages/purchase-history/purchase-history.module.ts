import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchaseHistoryPage } from './purchase-history';

@NgModule({
  declarations: [
    PurchaseHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(PurchaseHistoryPage),
  ],
})
export class PurchaseHistoryPageModule {}
