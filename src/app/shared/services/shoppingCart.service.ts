import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/pages/products/interfaces/product.interface';

@Injectable(
    {providedIn: 'root'}
)
export class ShoppingCartService{
    products : Product[] = [];

    private cartSubject = new BehaviorSubject<Product[]>([]);
    private totalSubject = new BehaviorSubject<number>(0);
    private quantitySubject = new BehaviorSubject<number>(0);

    // Al trabajar con Observables, se pone un $ al final: totalAction$
    get totalAction$(): Observable<number>{
        return this.totalSubject.asObservable();
    }
    get quantityAction$(): Observable<number>{
        return this.quantitySubject.asObservable();
    }
    get cartAction$(): Observable<Product[]>{
        return this.cartSubject.asObservable();
    }

    public updateCart(product :Product):void{
        this.addToCart(product);
        this.quantityProducts();
        this.calcTotal();
    }
    private calcTotal():void {
        const total = this.products.reduce( (acc, prod) => acc += (prod.price * prod.quantity),0);
        this.totalSubject.next(total);
    }

    private quantityProducts():void {
        const quantity = this.products.reduce( (acc, prod) => acc += (prod.quantity),0);
        this.quantitySubject.next(quantity);
    }

    private addToCart(product: Product): void {
        // Mira si está el producto en el array
        const isProductInCart = this.products.find(({ id }) => id == product.id)

        if (isProductInCart) {
            // Si está, aumenta en 1 la cantidad de ese producto
            isProductInCart.quantity += 1;
        } else {
            // Si no está, añado la propiedad quantity
            this.products.push({ ...product, quantity: 1 });
        }
        this.cartSubject.next(this.products);
    }

    resetCart():void{
        this.cartSubject.next([]);
        this.totalSubject.next(0);
        this.quantitySubject.next(0);
    }
}