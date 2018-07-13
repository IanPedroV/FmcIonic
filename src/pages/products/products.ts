import { Component } from '@angular/core';
import { IonicPage, LoadingController, Modal, ModalController } from 'ionic-angular';
import { Product } from "../../models/product";
import { Category } from "../../models/category";
import { ProductDetailsPage } from "../product-details/product-details";
import { ProductsServiceProvider } from "../../providers/products-service/products-service";
import { CategoriesServiceProvider } from "../../providers/categories-service/categories-service";

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
      { id: 1, name: 'Vips', description: 'Teste' },
      { id: 2, name: 'Passes', description: 'Teste' },
      { id: 3, name: 'Caixas', description: 'Teste' },
    ];

  constructor(private _modal: ModalController, private _loadingCtrl: LoadingController,
    private _productsService: ProductsServiceProvider, private _categoryService: CategoriesServiceProvider) {
  }


  ionViewDidLoad() {
    let loading = this._loadingCtrl.create({ content: 'Carregando produtos...' });
    loading.present();
    this._categoryService.list()
      .mergeMap((categories) => {
        //this.categoryList = categories;
        return this._productsService.list();
      }).subscribe(products => {
        loading.dismiss();
        this.productList = products;
        this.assignCatetories(this.productList);
      });
  }

  private assignCatetories(products) {
    products.map((product) => {
      product.category = this.categoryList.find((category: Category) =>
        category.id === product.categoryId);
      product.features = product.features.split(',');
    });
  }

  showDetails(product: Product) {
    let myModal: Modal = this._modal.create(ProductDetailsPage, product);
    myModal.present();
  }

  getProducts(category: Category) {
    return this.productList.filter(product => product.category === category);
  }

}
