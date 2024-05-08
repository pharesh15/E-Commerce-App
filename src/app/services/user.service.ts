import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, Login, Product, SignUp } from '../model/modelType';
import { BehaviorSubject } from 'rxjs';
import { CartService } from './cart.service';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  isError = new EventEmitter<boolean>(false);
  cartItems = new EventEmitter<number>();

  constructor(private http: HttpClient, private router: Router, private cartService: CartService) { }

  registerUser(data: SignUp) {
    this.http.post("http://localhost:3000/users", data, { observe: 'response' }).subscribe((result) => {
      if (result) {
        // this.isSellerLoggedIn.next(true);
        localStorage.setItem('userData', JSON.stringify(result.body));
        this.router.navigate(['/']);
      } else {
        console.log("Something went wrong while signing in, please try again!!");
      }
    });
  }

  reloadUser() {
    if (localStorage.getItem("userData")) {
      this.router.navigate(['/']);
    }
  }

  loginUser(data: Login) {
    let cartTotal = 0;
    this.http.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((result: any) => {
      if (result && result.body && result.body.length > 0) {
        localStorage.setItem('userData', JSON.stringify(result.body[0]));

        this.cartService.getCartByUserId(result.body[0].id).subscribe((userCartData: any) => {
          this.cartItems.emit(userCartData?.length);
          cartTotal = userCartData?.length;
        });

        let cartData: Product[] = localStorage.getItem('localProductCart') ? JSON.parse(localStorage.getItem('localProductCart')!) : [];
        if(cartData.length > 0){
          cartData.forEach((item: Product) => {
            this.cartService.getCartByProductAndUserId(item.id, result.body[0].id).subscribe((data: any) => {
              if (data?.length > 0) {
                let cartItem: Cart = {
                  id: data[0].id,
                  quantity: data[0].quantity + item.quantity,
                  userId: result.body[0].id,
                  productId: item.id
                };
                this.cartService.updateCartById(cartItem).subscribe();
              } else {
                let cartItem: Cart = {
                  quantity: item.quantity!,
                  userId: result.body[0].id,
                  productId: item.id
                };
                this.cartService.addToCart(cartItem).subscribe(() => {
                  cartTotal += 1;
                  this.cartItems.emit(cartTotal);
                });
              }
            });
          });
        }

        localStorage.removeItem('localProductCart');
        this.router.navigate(['/']);
      } else {
        this.isError.emit(true);
        console.log("Login failed");
      }
    });
  }
}
