import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart';
import { CartService } from '../services/cart.service';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  public cart: Cart;
  public CanYProd = new Array();

 constructor(private cartService: CartService, private alert: AlertController, public toastController: ToastController) {
    this.cart = this.cartService.getCart();
    this.CanYProd = this.cartService.getCantYProd();

  }
  async showAlert(pos: number){
    const al = await this.alert.create({
      header: 'Confirmar',
      message: '¿Desea eliminar este producto del carrito? *Efectuar esta acción eliminará el acumulado de productos.',
      buttons: [{text: 'No'},
      {text: 'Sí', handler: () => {
          this.presentToast();
          this.cartService.deleteOnCart(pos);
                }
      }]
    });
    await al.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Producto eliminado',
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
  }

}
