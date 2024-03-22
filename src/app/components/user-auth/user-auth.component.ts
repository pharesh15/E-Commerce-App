import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login, SignUp } from '../../model/modelType';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {
  constructor(private userService: UserService, private router: Router){}
  showLogin: boolean = false;
  loginError: string = '';

  ngOnInit(): void {
    this.userService.reloadUser();
  }

  handleRegister(userData: SignUp) {
    this.userService.registerUser(userData);
  }

  handleLogin(loginData: Login) {
    this.userService.loginUser(loginData);
    this.userService.isError.subscribe((isError) => {
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
