import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Cart;
  private CanYProd = new Array();


  constructor() {
    this.cart = {
      products: [],
      date: new Date(),
      subtotal: 0,
      iva: 0,
      total: 0,
      qtypord: 0
    };

  }

  public getCart(): Cart {
    return this.cart;
  }

  public getCantYProd(){
    return this.CanYProd;
  }

  public addProduct(product: Product): Cart {

    this.cart.products.push(product);
    this.cart.subtotal += product.price;
    this.cart.iva = this.cart.subtotal * 0.16;
    this.cart.total = this.cart.subtotal + this.cart.iva;
    this.cart.date = new Date();
    if( this.countProductsInCart(product) === 1){
      this.CanYProd.push( {c:1, p:product});
      console.log('Si entra');
    }else{
      this.updateCount(product, this.countProductsInCart(product));
    }

    return this.cart;

  }

  private countProductsInCart(product: Product): number{
    let cant = 0;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.cart.products.length; i++) {
      if (this.cart.products[i].name === product.name){
          cant += 1;
      }
    }
    return cant;
  }

  updateCount(product: Product, cant: number){

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.CanYProd.length; i++) {
      if (this.CanYProd[i].p.name === product.name){
        this.CanYProd[i].c = cant;
      }
    }

  }


  public deleteOnCart(position: number): Cart {
    let totalBorrados = 0;
    for (let i = 0; i < this.cart.products.length; i++) {
        if (this.CanYProd[position].p.name === this.cart.products[i].name){
          this.cart.subtotal -= this.cart.products[i].price;
          this.cart.products.splice(i, 1);
          i--;
          totalBorrados += 1;
        }
    }
    console.log('Se borraron' + totalBorrados);
    this.CanYProd.splice(position, 1);
    this.cart.iva = this.cart.subtotal * 0.16;
    this.cart.total = this.cart.subtotal + this.cart.iva;
    this.cart.date = new Date();
    return this.cart;
  }

}
