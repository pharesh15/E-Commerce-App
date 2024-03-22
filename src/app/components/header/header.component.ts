import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/modelType';

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
  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.router.events.subscribe((route: any) => {
      if (route.url) {
        if (localStorage.getItem("sellerData") && route.url.includes("seller")) {
          this.menuType = "SELLER";
          let sellerStore = localStorage.getItem("sellerData");
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.firstName;
        }else if (localStorage.getItem("userData")) {
          this.menuType = "USER";
          let userStore = localStorage.getItem("userData");
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.firstName;
        }else {
          this.menuType = "DEFAULT";
        }
      }
    })
  }

  logout() {
    localStorage.removeItem("sellerData");
    this.router.navigate(['/']);
  }

  userLogout(){
    localStorage.removeItem("userData");
    this.router.navigate(['/user-auth']);
  }

  searchProduct(event: KeyboardEvent){
    if(event){
      const element = event.target as HTMLInputElement;
      if(element.value != ""){
        this.productService.searchProduct(element.value).subscribe((result) => {
          if(result){
            if(result.length > 5){
              result.length = 5;
            }
            this.searchResult = result;
          }
        })
      }
      else{
        this.searchResult = undefined;
      }
    }
  }

  hideSearch(){
    this.searchResult = undefined;
  }

  submitSearch(val: string){
    this.router.navigate([`search/${val}`]);
  }

  redirectToDetails(id: string){
    this.router.navigate(['/details/' + id]);
  }
}
