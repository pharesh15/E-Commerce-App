import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../model/modelType';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  addToCart(data: Cart) {
    return this.http.post("http://localhost:3000/cart", data);
  }

  getAllCart() {
    return this.http.get<Cart[]>("http://localhost:3000/cart");
  }

  deleteCartById(id: string) {
    return this.http.delete(`http://localhost:3000/cart/${id}`);
  }

  getCartById(id: string) {
    return this.http.get<Cart>(`http://localhost:3000/cart/${id}`);
  }

  getCartByProductAndUserId(productId: string, userId: string) {
    return this.http.get<Cart>(`http://localhost:3000/cart?productId=${productId}&userId=${userId}`);
  }

  getCartByUserId(userId: string) {
    return this.http.get<Cart>(`http://localhost:3000/cart?userId=${userId}`);
  }

  updateCartById(data: Cart) {
    return this.http.put<Cart>(`http://localhost:3000/cart/${data.id}`, data);
  }
}
