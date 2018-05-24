import {Component} from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  constructor(private viewController: ViewController, public navParams: NavParams) {
  }

  closeModal() {
    this.viewController.dismiss(this.viewController.data);
  }

}
