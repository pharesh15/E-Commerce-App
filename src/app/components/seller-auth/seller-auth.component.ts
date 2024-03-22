import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SellerService } from '../../services/seller.service';
import { Login, SignUp } from '../../model/modelType';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent {
  constructor(private sellerService: SellerService, private router: Router) { }
  showLogin: boolean = false;
  loginError: string = '';
  ngOnInit(): void {
    this.sellerService.reloadSeller();
  }

  handleRegister(userData: SignUp) {
    this.sellerService.registerUser(userData);
  }

  handleLogin(loginData: Login) {
    // this.loginError = "";
    this.sellerService.loginUser(loginData);
    this.sellerService.isError.subscribe((isError) => {
      if (isError) {
        this.loginError = "Wrong Email or Password!!";
      }
    })
  }

  openSignUp() {
    this.showLogin = true;
  }

  openLogin() {
    this.showLogin = false;
  }
}
