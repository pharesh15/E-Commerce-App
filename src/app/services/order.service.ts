import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../model/modelType';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  orderList(userId: string){
    return this.http.get<Order[]>(`http://localhost:3000/orders?userId=${userId}`)
  }

  deleteOrder(id: string) {
    return this.http.delete(`http://localhost:3000/orders/${id}`);
  }
}
