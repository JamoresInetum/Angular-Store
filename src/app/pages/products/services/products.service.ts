import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  // Propiedades
  private apiURL = 'http://localhost:3030/products';
  
  // Constructor
  constructor(private http: HttpClient) { }

  // Métodos
  getProducts(): Observable<any>{
    // retorna una lista de productos
    return this.http.get<Product[]>(this.apiURL);
  }

}
