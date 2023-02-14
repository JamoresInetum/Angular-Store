import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Details, Order } from 'src/app/shared/interfaces/order.interface';
import { Store } from 'src/app/shared/interfaces/store.interface';
import { ShoppingCartService } from 'src/app/shared/services/shoppingCart.service';
import { Product } from '../products/interfaces/product.interface';
import { DataService } from '../products/services/data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],

})
export class CheckoutComponent implements OnInit {
  model = {
    name: '',
    store: '',
    shippingAddress: '',
    city: ''
  }

  cart: Product[] = [];
  isDelivery: boolean = true;
  stores: Store[] = []

  constructor(
    private dataService: DataService, 
    private shoppingCartService: ShoppingCartService,
    private router:Router) { }
    
  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
    this.prepareDetails();
  }

  onPickUpOrDelivery(value: boolean): void {
    // console.log(value)
    this.isDelivery = value;
  }

  onSubmit({ value: formData }: NgForm): void {
    console.log("Guardar", formData);
    const data: Order = {
      ...formData,
      date: this.getCurrentDay(),
      pickup: this.isDelivery
    }
    this.dataService.saveOrder(data)
      .pipe(
        tap(res => console.log('Order =>', res)),
        switchMap(({id:orderId}) => {          
          const details = this.prepareDetails();
          return this.dataService.saveDetailsOrder({ details, orderId });
        }),
        tap(res => console.log('Finish =>', res)),
      )
      .subscribe();
  }
  private getStores() {
    this.dataService.getStores()
      .pipe(
        tap((stores: Store[]) => this.stores = stores))
      .subscribe()
  }

  private getCurrentDay(): string {
    return new Date().toLocaleDateString();
  }

  private prepareDetails(): Details[] {
    const details: Details[] = [];
    this.cart.forEach((product:Product) => {
      const {id:productId, name:productName, quantity, stock} = product;
      details.push({productId,productName, quantity});
    })
    return details;
  }

  private getDataCart(): void {
    this.shoppingCartService.cartAction$
      .pipe(
        tap((products: Product[]) => this.cart = products)
      ).subscribe();
  }
}
