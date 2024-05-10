import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Order } from '../model/modelType';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  cartItems = new EventEmitter<number>();
  constructor(private http: HttpClient) { }

  orderNow(data: Order) {
    return this.http.post("http://localhost:3000/orders", data);
  }
}
