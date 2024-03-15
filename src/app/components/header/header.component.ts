import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuType: string = "DEFAULT";
  sellerName: string = "";
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((route: any) => {
      if (route.url) {
        if (localStorage.getItem("sellerData") && route.url.includes("seller")) {
          this.menuType = "SELLER";
          let sellerStore = localStorage.getItem("sellerData");
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.firstName;
        } else {
          this.menuType = "DEFAULT";
        }
      }
    })
  }

  logout() {
    localStorage.removeItem("sellerData");
    this.router.navigate(['/']);
  }
}
