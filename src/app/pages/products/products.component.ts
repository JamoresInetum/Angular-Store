import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import { tap } from 'rxjs/operators'
import { Product } from './interfaces/product.interface';
import { ShoppingCartService } from 'src/app/shared/services/shoppingCart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products!: Product[]; // pongo la ! para no necesitar inicializarlo
  constructor(private productService: ProductsService, private shoppingCartService: ShoppingCartService){}

  ngOnInit(): void  {
    this.productService.getProducts().pipe(
    // Escribe en la consola la respuesta de la api
    // tap(res =>console.log(res))

    // Guarda el resultado en el array de clase
    tap((products:Product[])=> this.products = products)
    ).subscribe();
  }

  addToCart(product:Product):void {
    // console.log("Add to cart ", product)
    this.shoppingCartService.updateCart(product);
  }
}
