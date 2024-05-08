import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Cart, Product } from '../model/modelType';
import { NgToastService } from 'ng-angular-popup';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartItems = new EventEmitter<number>();
  constructor(private http: HttpClient, private toast: NgToastService, private cartService: CartService) { }

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
    let cartData:Product[] = [];
    let localProductCart = localStorage.getItem('localProductCart');
    if (!localProductCart) {
      localStorage.setItem('localProductCart', JSON.stringify([data]));
      cartData.push(data);
      this.toast.success({detail: "SUCCESS", summary: "Product added to cart", duration: 3000});
    } else {
      cartData = JSON.parse(localProductCart);

      let productIndex = cartData.findIndex((item) => item.id === data.id);
      if(productIndex === -1){
        cartData.push(data);
        localStorage.setItem('localProductCart', JSON.stringify(cartData));
        this.toast.success({detail: "SUCCESS", summary: "Product added to cart", duration: 3000});
      }else{
        cartData[productIndex].quantity! += data.quantity!;
        localStorage.setItem('localProductCart', JSON.stringify(cartData));
        this.toast.info({detail: "INFO", summary: "Product is already in cart", duration: 3000});
      }
    }

    this.cartItems.emit(cartData.length);
  }

  remoteAddToCard(data: Product) {
    const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')!) : null;

    if(userData){
      this.cartService.getCartByProductAndUserId(data.id, userData.id).subscribe((result: any) => {
        if(result?.length > 0){
          let cartItem: Cart = {
            id: result[0].id,
            quantity: data.quantity + result[0].quantity,
            userId: userData.id,
            productId: data.id
          };
          this.cartService.updateCartById(cartItem).subscribe();
          this.toast.info({detail: "INFO", summary: "Product is already in cart", duration: 3000});
        }else{
          let cartItem: Cart = {
            quantity: data.quantity!,
            userId: userData.id,
            productId: data.id
          };
          this.cartService.addToCart(cartItem).subscribe(() => {
            this.cartService.getCartByUserId(userData.id).subscribe((userCartData: any) => {
              this.cartItems.emit(userCartData.length);
            });
          });
          this.toast.success({detail: "SUCCESS", summary: "Product added to cart", duration: 3000});
        }
      });
    }
  }
}
