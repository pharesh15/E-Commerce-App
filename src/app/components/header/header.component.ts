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
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((route: any) => {
      if (route.url) {
        if (localStorage.getItem("sellerData") && route.url.includes("seller")) {
          this.menuType = "SELLER";
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
