import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/modelType';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(data: Product) {
    return this.http.post("http://localhost:3000/products", data);
  }

  listProduct() {
    return this.http.get<Product[]>("http://localhost:3000/products");
  }

  deleteProduct(id: string) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProduct(id: string) {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(data: Product) {
    return this.http.put<Product>(`http://localhost:3000/products/${data.id}`, data);
  }

  popularProducts(limit: number) {
    return this.http.get<Product[]>(`http://localhost:3000/products?_limit=${limit}`);
  }

  trendyProducts(limit: number) {
    return this.http.get<Product[]>(`http://localhost:3000/products?_limit=${limit}`);
  }

  searchProduct(query: string) {
    return this.http.get<Product[]>(`http://localhost:3000/products?category=${query}`);
  }

  localAddToCard(data: Product) {
    let localProductCart = localStorage.getItem('localProductCart');
    if (!localProductCart) {
      localStorage.setItem('localProductCart', JSON.stringify([data]));
    } else {
      let cartData = [];
      cartData = JSON.parse(localProductCart);
      cartData.push(data);
      localStorage.setItem('localProductCart', JSON.stringify(cartData));
    }
  }
}
