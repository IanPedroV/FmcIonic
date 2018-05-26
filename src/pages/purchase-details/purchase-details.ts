import {Component} from '@angular/core';
import {IonicPage, ViewController} from 'ionic-angular';

/**
 * Generated class for the PurchaseDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-purchase-details',
  templateUrl: 'purchase-details.html',
})
export class PurchaseDetailsPage {

  constructor(private viewController: ViewController) {
  }

  closeModal() {
    this.viewController.dismiss(this.viewController.data);
  }

}
