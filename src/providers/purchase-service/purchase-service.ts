import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ProductsServiceProvider} from "../products-service/products-service";
import {UserServiceProvider} from "../user-service/user-service";
import {PurchaseSorter} from "../../utils/purchase-sorter";

@Injectable()
export class PurchaseServiceProvider {

  constructor(private _http: HttpClient, private _productService: ProductsServiceProvider) {

  }

  list() {
    return this._http.get<any[]>('http://192.168.15.13:3000/purchases');
  }

  get(id: number) {
    return this._http.get<any[]>('http://192.168.15.13:3000/purchases/purchase/' + id);

  }

  create(purchase) {
    return this._http.post('http://192.168.15.13:3000/purchases/purchase', purchase);
  }

  update(purchase) {
    return this._http.put('http://192.168.15.13:3000/purchases/purchase/' + purchase.orderId, purchase);
  }

  verify(data) {
    return this._http.post('http://192.168.15.13:3000/purchases/verify', data);
  }


  assignProduct(purchase, purchases: Array<any>) {
    purchase.product = this._productService.products.find(product => product.id === parseInt(purchase.productId));
    PurchaseSorter.sortPurchases(purchases);
  }

  assignProducts(purchases: Array<any>) {
    purchases.forEach(purchase => purchase.product = this._productService.products.find(product =>
      product.id === purchase.productId));
    PurchaseSorter.sortPurchases(purchases);
  }


}
