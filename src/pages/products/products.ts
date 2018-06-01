import {Component} from '@angular/core';
import {IonicPage, LoadingController, Modal, ModalController} from 'ionic-angular';
import {Product} from "../../models/product";
import {Category} from "../../models/category";
import {ProductDetailsPage} from "../product-details/product-details";
import {ProductsServiceProvider} from "../../providers/products-service/products-service";
import {CategoriesServiceProvider} from "../../providers/categories-service/categories-service";
import {Observable} from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  category: string = 'Vips';
  productList: Array<Product> = [];
  categoryList: Array<Category> =
    [
      {id: 1, name: 'Vips', description: 'Teste'},
      {id: 2, name: 'Passes', description: 'Teste'},
      {id: 3, name: 'Caixas', description: 'Teste'},
    ];

  constructor(private _modal: ModalController, private _loadingCtrl: LoadingController,
              private _productsService: ProductsServiceProvider, private _categoryService: CategoriesServiceProvider) {
  }


  ionViewDidLoad() {
    let loading = this._loadingCtrl.create({content: 'Carregando produtos...'});
    loading.present();
    Observable.forkJoin([this._categoryService.list(), this._productsService.list()]).subscribe(results => {
      //console.log(this.categoryList);
      // this.categoryList = results[0];
      this.productList = results[1];
      this.assignCatetories(this.productList);
      //console.log(this.categoryList);
      //console.log(this.productList);
      loading.dismiss();
    });
  }

  private assignCatetories(products) {
    products.map(product => {
      product.category = this.categoryList.find(category =>
        category.id === product.category_id);
      product.features = product.features.split(',')
    });
  }

  showDetails(product: Product) {
    let myModal: Modal = this._modal.create(ProductDetailsPage.name, product);
    myModal.present();
  }

  getProducts(category: Category) {
    return this.productList.filter(product => product.category === category);
  }
}
