import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent{

  // Con el decorador @Input() puedo comunicarme con los descendientes
  @Input() product!:Product;
  //Con el decorador @Output() puedo comunicarme con los ascendentes
  @Output() addToCartClick = new EventEmitter<Product>();

  constructor(){ }

  ngOnInit(): void {
  }

  onClick():void{
    // Emito el mismo producto que he recibido
    this.addToCartClick.emit(this.product)
  }
}
