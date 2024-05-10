import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Cart, Order } from '../../model/modelType';
import { CheckoutService } from '../../services/checkout.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  cartAllData: Cart[] | undefined;
  totalPayableAmount: number = 0;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private checkoutService: CheckoutService,
    private router: Router,
    private toast: NgToastService
  ){}

  ngOnInit(): void {
      let userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')!) : null;
      if(userData){
        this.cartService.getCartByUserId(userData.id).subscribe((cartData: any) => {
          if(cartData.length > 0){
            this.cartAllData = cartData;
            cartData.forEach((item: Cart, index: number) => {
              this.productService.getProduct(item.productId).subscribe((productData: any) => {
                let productTotalPrice = 0;
                if(productData){
                  productTotalPrice = Number(item.quantity) * Number(productData.price);
                  this.totalPayableAmount = this.totalPayableAmount + productTotalPrice;
                }

                if(cartData.length - 1 === index){
                  this.totalPayableAmount = this.totalPayableAmount + 100 + (this.totalPayableAmount * 5 / 100) - (this.totalPayableAmount * 8 / 100);
                }
              });
            });

          }
        });
      }

  }


  handleOrderData(data: {email: string, address: string, contact: string}){
    const userData = localStorage.getItem('userData');
    const userId = userData && JSON.parse(userData).id;

    if(this.totalPayableAmount){
      const orderData: Order = {
        ...data,
        totalPayableAmount: this.totalPayableAmount,
        userId,
        id: undefined
      }

      this.checkoutService.orderNow(orderData).subscribe(() => {
        if(this.cartAllData){
          this.cartAllData.forEach((item) => {
            setTimeout(() => {
              item.id && this.cartService.deleteCartById(item.id).subscribe();
            }, 1000);
          })
        }

        this.router.navigate(['/orders']);
        this.toast.success({detail: "SUCCESS", summary: "Order has been placed successfully", duration: 3000});
        this.productService.cartItems.emit(0);
      });
    }
  }
}
