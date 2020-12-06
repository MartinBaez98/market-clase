import { Product } from './product';

export class Cart {
    products: Product[];
    subtotal: number;
    iva: number;
    total: number;
    date: Date;
    qtypord: number;
}
