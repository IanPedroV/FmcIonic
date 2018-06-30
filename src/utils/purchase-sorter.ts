import {Purchase} from "../models/purchase";

export class PurchaseSorter {
  static sortPurchases(purchases: Array<Purchase>) {
    purchases.sort(function (o1, o2) {
      let date1: Date = new Date(parseInt(o1.purchaseTimeMillis));
      let date2: Date = new Date(parseInt(o2.purchaseTimeMillis));
      return date1 > date2 ? -1 : date1 < date2 ? 1 : 0;
    });
  }
}
