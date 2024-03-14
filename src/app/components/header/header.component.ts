import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((route: any) => {
      if (route) {
        if (localStorage.getItem("sellerData") && route.url.includes("seller")) {
          console.log("Inside seller");
        } else {
          console.log("outside");
        }
      }
    })
  }
}
