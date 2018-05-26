import {Component} from '@angular/core';
import {IonicPage, Modal, ModalController} from 'ionic-angular';
import {Product} from "../../models/product";
import {Category} from "../../models/category";
import {ProductDetailsPage} from "../product-details/product-details";

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  category: string = 'Vips';
  productList: Array<Product> = [];
  static categoryList: Array<Category> = [
    {name: 'Vips', description: 'Teste'},
    {name: 'Passes', description: 'Teste'},
    {name: 'Caixas', description: 'Teste'},
  ];

  constructor(private modal: ModalController) {

    this.productList = this.productList = [
      {
        name: 'VIP Lendário',
        category: ProductsPage.categoryList[0],
        description: 'Teste',
        features: ['5 caixas misteriosas', 'Slot Reservado','15 Efeitos','10 cores de chat','5000 moedas','10000 XP'],
        price: 10,
        image: 'https://dunb17ur4ymx4.cloudfront.net/packages/images/2371470d77ce816fef4f21ec773ab0836f6d874d.png'
      },
      {
        name: 'VIP Epico',
        category: ProductsPage.categoryList[0],
        description: 'Teste',
        features: ['5 caixas misteriosas', 'Slot Reservado','15 Efeitos','10 cores de chat','5000 moedas','10000 XP'],
        price: 20,
        image: 'https://dunb17ur4ymx4.cloudfront.net/packages/images/d2a73e55ba219acd84d9add82f64055c1bc21b04.png'
      },
      {
        name: 'VIP',
        category: ProductsPage.categoryList[0],
        description: 'Teste',
        features: ['5 caixas misteriosas', 'Slot Reservado','15 Efeitos','10 cores de chat','5000 moedas','10000 XP'],
        price: 30,
        image: 'https://dunb17ur4ymx4.cloudfront.net/packages/images/3c34b569fddd386b8c6b7283df8e34eaabc704a2.png'
      },
      {
        name: 'Kit Refletz',
        category: ProductsPage.categoryList[1],
        description: 'Teste',
        features: ['5 caixas misteriosas', 'Slot Reservado','15 Efeitos','10 cores de chat','5000 moedas','10000 XP'],
        price: 30,
        image: 'https://dunb17ur4ymx4.cloudfront.net/packages/images/2670dd47b99146ce668c11ce774ff0d405b4ef59.png'
      },
      {
        name: 'Kit Baixa',
        category: ProductsPage.categoryList[1],
        description: 'Teste',
        features: ['5 caixas misteriosas', 'Slot Reservado','15 Efeitos','10 cores de chat','5000 moedas','10000 XP'],
        price: 30,
        image: 'https://dunb17ur4ymx4.cloudfront.net/packages/images/a60c777edace2a14a3be41fd99af974adfc4f001.png'
      },
      {
        name: 'Kit Jazz',
        category: ProductsPage.categoryList[2],
        description: 'Teste',
        features: ['5 caixas misteriosas', 'Slot Reservado','15 Efeitos','10 cores de chat','5000 moedas','10000 XP'],
        price: 30,
        image: 'https://dunb17ur4ymx4.cloudfront.net/packages/images/a60c777edace2a14a3be41fd99af974adfc4f001.png'
      },
      {
        name: 'Kit Spok',
        category: ProductsPage.categoryList[2],
        description: 'Teste',
        features: ['5 caixas misteriosas', 'Slot Reservado','15 Efeitos','10 cores de chat','5000 moedas','10000 XP'],
        price: 30,
        image: 'https://dunb17ur4ymx4.cloudfront.net/packages/images/a60c777edace2a14a3be41fd99af974adfc4f001.png'
      }
    ]
  }

  showDetails(product: Product) {
    let myModal: Modal = this.modal.create(ProductDetailsPage.name, product);
    myModal.present();
  }

  getProducts(category: Category) {
    return this.productList.filter(product => product.category === category);
  }

  getCategories(){
    return ProductsPage.categoryList;
  }


}
