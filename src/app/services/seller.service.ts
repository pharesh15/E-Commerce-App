import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Login, SignUp } from '../model/SignUp';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isError = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }

  registerUser(data: SignUp) {
    this.http.post("http://localhost:3000/users", data, { observe: 'response' }).subscribe((result) => {
      if (result) {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('sellerData', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      } else {
        console.log("Something went wrong while signing in, please try again!!");
      }
    });
  }

  reloadSeller() {
    if (localStorage.getItem("sellerData")) {
      this.router.navigate(['seller-home']);
    }
  }

  loginUser(data: Login) {
    this.http.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((result: any) => {
      if (result && result.body && result.body.length > 0) {
        localStorage.setItem('sellerData', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      } else {
        this.isError.emit(true);
        console.log("Login failed");
      }
    });
  }
}
