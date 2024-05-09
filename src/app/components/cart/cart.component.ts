import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Cart, PriceSummary } from '../../model/modelType';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartAllData: any[] | undefined;
  priceSummary: PriceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  constructor(private cartService: CartService, private productService: ProductService, private router: Router){}
  ngOnInit(): void {
    this.getCartData()
  }

  getCartData(){
    let cartProductData: any[] = [];

    let userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')!) : null;
    if(userData){
      this.cartService.getCartByUserId(userData.id).subscribe((cartData: any) => {
        if(cartData.length > 0){
          cartData.forEach((item: Cart, index: number) => {
            this.productService.getProduct(item.productId).subscribe((productData: any) => {
              let productTotalPrice = 0;
              if(productData){
                productTotalPrice = Number(item.quantity) * Number(productData.price);
                cartProductData.push({
                  ...item,
                  ...productData,
                  productTotalPrice
                });
                this.priceSummary.price = this.priceSummary.price + productTotalPrice;
              }

              if(index === cartData.length - 1){
                this.cartAllData = cartProductData;
                this.priceSummary.discount = (this.priceSummary.price * 8 / 100);
                this.priceSummary.tax = (this.priceSummary.price * 5 / 100);
                this.priceSummary.delivery = 100;
                this.priceSummary.total = this.priceSummary.price + this.priceSummary.delivery + this.priceSummary.tax - this.priceSummary.discount;
              }
            });
          });
        }
      });
    }
  }

  handleCheckout(){
    this.router.navigate(['/checkout']);
  }
}
