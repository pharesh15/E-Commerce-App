import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/modelType';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuType: string = "DEFAULT";
  searchResult: undefined | Product[];
  sellerName: string = "";
  userName: string = "";
  cartItems: number = 0;
  constructor(private router: Router, private productService: ProductService, private userService: UserService, private cartSevice: CartService) { }

  ngOnInit(): void {
    this.router.events.subscribe((route: any) => {
      if (route.url) {
        if (localStorage.getItem("sellerData") && route.url.includes("seller")) {
          this.menuType = "SELLER";
          let sellerStore = localStorage.getItem("sellerData");
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.firstName;
        } else if (localStorage.getItem("userData")) {
          this.menuType = "USER";
          let userStore = localStorage.getItem("userData");
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.firstName;
        } else {
          this.menuType = "DEFAULT";
        }
      }
    });

    // let cartData = localStorage.getItem('localProductCart');
    // this.cartItems = cartData ? JSON.parse(cartData).length : 0;
    if(localStorage.getItem('userData')){
      this.cartSevice.getCartByUserId(JSON.parse(localStorage.getItem('userData')!).id).subscribe((data: any) => {
        this.cartItems = data.length;
      });
    }else{
      this.cartItems = localStorage.getItem('localProductCart') ? JSON.parse(localStorage.getItem('localProductCart')!!).length : 0;
    }

    this.productService.cartItems.subscribe((items) => {
      this.cartItems = items;
    });
    this.userService.cartItems.subscribe((items) => {
      this.cartItems = items;
    });
  }

  logout() {
    localStorage.removeItem("sellerData");
    this.router.navigate(['/']);
  }

  userLogout() {
    localStorage.removeItem("userData");
    this.cartItems = 0;
    this.router.navigate(['/user-auth']);
  }

  searchProduct(event: KeyboardEvent) {
    if (event) {
      const element = event.target as HTMLInputElement;
      if (element.value != "") {
        this.productService.searchProduct(element.value).subscribe((result) => {
          if (result) {
            if (result.length > 5) {
              result.length = 5;
            }
            this.searchResult = result;
          }
        })
      }
      else {
        this.searchResult = undefined;
      }
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  submitSearch(val: string) {
    this.router.navigate([`search/${val}`]);
  }

  redirectToDetails(id: string) {
    this.router.navigate(['/details/' + id]);
  }
}
