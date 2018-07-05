import {Purchase} from "../models/purchase";

export class ArraySorter {
  static sortByMillisecondsDate(purchases: Array<Purchase>) {
    purchases.sort(function (o1, o2) {
      let date1: Date = new Date(parseInt(o1.purchaseTimeMillis));
      let date2: Date = new Date(parseInt(o2.purchaseTimeMillis));
      return date1 > date2 ? -1 : date1 < date2 ? 1 : 0;
    });
  }

  static sortByDate(list: Array<any>, dateName) {
    list.sort(function (o1, o2) {
      let date1: Date = new Date(o1[dateName]);
      let date2: Date = new Date(o2[dateName]);
      return date1 > date2 ? -1 : date1 < date2 ? 1 : 0;
    });
  }
}
