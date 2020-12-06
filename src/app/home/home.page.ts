import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public products: Product[];

  constructor(private productService: ProductService, private cartService: CartService,
    private alert: AlertController, public toastController: ToastController) {
    this.products = this.productService.getProducts();
  }

  public addToCart(p: Product): void{
    this.cartService.addProduct(p);
  }

  async showAlert(p: Product){
    const al = await this.alert.create({
      header: 'Confirmar',
      message: '¿Agregar el producto al carrito de compras?',
      buttons: [{text: 'No'},
      {text: 'Sí', handler: () => {
          this.addToCart(p);
          this.presentToast(p.name);
        }
      }]
    });
    await al.present();
  }

  async presentToast(name: string) {
    const toast = await this.toastController.create({
      message: name + ' agregado al carrito.',
      duration: 2000
    });
    toast.present();
  }
}
