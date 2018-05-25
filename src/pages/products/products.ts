import {Component} from '@angular/core';
import {IonicPage, Modal, ModalController} from 'ionic-angular';
import {ModalPage} from "../modal/modal";
import {Product} from "../../models/product";
import {Category} from "../../models/category";

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  category: string = 'Vips';
  productList: Array<Product> = [];
  categoryList: Array<Category> = [];

  constructor(private modal: ModalController) {
    this.categoryList = [
      {name: 'Vips', description: 'Teste'},
      {name: 'Passes', description: 'Teste'},
      {name: 'Caixas', description: 'Teste'},
    ];

    this.productList = [
      {
        name: 'VIP Lendário',
        category: this.categoryList[0],
        description: 'Teste',
        price: 10,
        image: 'https://dunb17ur4ymx4.cloudfront.net/packages/images/2371470d77ce816fef4f21ec773ab0836f6d874d.png'
      },
      {
        name: 'VIP Epico',
        category: this.categoryList[0],
        description: 'Teste',
        price: 20,
        image: 'https://dunb17ur4ymx4.cloudfront.net/packages/images/d2a73e55ba219acd84d9add82f64055c1bc21b04.png'
      },
      {
        name: 'VIP',
        category: this.categoryList[0],
        description: 'Teste',
        price: 30,
        image: 'https://dunb17ur4ymx4.cloudfront.net/packages/images/3c34b569fddd386b8c6b7283df8e34eaabc704a2.png'
      },
      {
        name: 'Kit Refletz',
        category: this.categoryList[1],
        description: 'Teste',
        price: 30,
        image: 'https://dunb17ur4ymx4.cloudfront.net/packages/images/2670dd47b99146ce668c11ce774ff0d405b4ef59.png'
      },
      {
        name: 'Kit Baixa',
        category: this.categoryList[1],
        description: 'Teste',
        price: 30,
        image: 'https://dunb17ur4ymx4.cloudfront.net/packages/images/a60c777edace2a14a3be41fd99af974adfc4f001.png'
      },
      {
        name: 'Kit Jazz',
        category: this.categoryList[2],
        description: 'Teste',
        price: 30,
        image: 'https://dunb17ur4ymx4.cloudfront.net/packages/images/a60c777edace2a14a3be41fd99af974adfc4f001.png'
      },
      {
        name: 'Kit Spok',
        category: this.categoryList[2],
        description: 'Teste',
        price: 30,
        image: 'https://dunb17ur4ymx4.cloudfront.net/packages/images/a60c777edace2a14a3be41fd99af974adfc4f001.png'
      }
    ]
  }

  showDetails(product: Product) {
    let myModal: Modal = this.modal.create(ModalPage.name, {name: product.name});
    myModal.present();
  }

  isVIPS(category: Category) {
    return category.name === 'VIPS';
  }

  showMessage(message: string) {
    console.log(message)
  }

  getProducts(category: Category) {
    return this.productList.filter(product => product.category === category);
  }


}
