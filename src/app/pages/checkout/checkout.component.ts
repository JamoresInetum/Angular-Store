import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Store } from 'src/app/shared/interfaces/store.interface';
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

  isDelivery: boolean = false;
  stores: Store[] = []

  constructor(private dataService: DataService) { }
  ngOnInit(): void {
    this.getStores();
  }

  onPickUpOrDelivery(value: boolean): void {
    // console.log(value)
    this.isDelivery = value;
  }

  onSubmit() {
    console.log("Guardar")
  }
  private getStores() {
    this.dataService.getStores()
      .pipe(
        tap((stores: Store[]) => this.stores = stores))
      .subscribe()
  }
}
