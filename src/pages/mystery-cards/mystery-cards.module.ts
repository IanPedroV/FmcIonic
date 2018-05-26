import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MysteryCardsPage} from './mystery-cards';

@NgModule({
  declarations: [
    MysteryCardsPage,
  ],
  imports: [
    IonicPageModule.forChild(MysteryCardsPage),
  ], exports: [
    MysteryCardsPage
  ]
})
export class MysteryCardsPageModule {
}
