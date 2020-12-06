import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
})
export class NewProductPage implements OnInit {

  public Product: Product;
  public myForm: FormGroup;
  public validationMessages;

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.validationMessages = {
      name: [
          { type: 'required',   message: 'Nombre del producto es obligatorio.' },
          { type: 'minlength',  message: 'Longitud mínima de 4 carácteres.' },
          { type: 'maxlength',  message: 'Longitud máxima de 15 carácteres.' },
          { type: 'pattern',    message: 'No se permiten carácteres especiales.' }
        ],
      photo: [
          { type: 'required', message: 'Es necesario el link de la imagen.' },
          { type: 'pattern', message: 'Link no válido.' }
        ],
      description: [
          { type: 'required', message: 'Es necesario una descrición.' },
          { type: 'minlength',  message: 'Por lo menos 15 carácteres.' }
        ],
      price: [
          { type: 'required', message: 'Es necesario asignar un precio' },
          { type: 'pattern', message: 'El precio no puede ser 0' }
        ],
          };
   }

  ngOnInit() {
    this.cleanInputs();
  }

  public create(): void{
    this.Product = {
      name: this.myForm.controls.name.value,
      description: this.myForm.controls.description.value,
      photo: this.myForm.controls.photo.value,
      price: this.myForm.controls.price.value
    };
    this.productService.newProduct(this.Product);
    this.cleanInputs();
  }

  private cleanInputs(): void {
    this.myForm = this.fb.group(
      {
        photo: ['', Validators.compose([
          Validators.required,
          Validators.pattern('^https?:[a-zA-Z0-9#$%&/()=._-\]+')

        ])],
        name: ['', Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(15),
          Validators.pattern('[a-zA-Z0-9]+')

        ] )],
        description: ['', Validators.compose([Validators.required, Validators.minLength(15)])],
        price: [0, Validators.compose([
          Validators.pattern('[1-9]+[0-9]*')

        ] )]
      }
    );
  }

}
