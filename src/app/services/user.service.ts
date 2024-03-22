import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login, SignUp } from '../model/modelType';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  isError = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }

  registerUser(data: SignUp) {
    this.http.post("http://localhost:3000/users", data, { observe: 'response' }).subscribe((result) => {
      if (result) {
        // this.isSellerLoggedIn.next(true);
        localStorage.setItem('userData', JSON.stringify(result.body));
        this.router.navigate(['/']);
      } else {
        console.log("Something went wrong while signing in, please try again!!");
      }
    });
  }

  reloadUser() {
    if (localStorage.getItem("userData")) {
      this.router.navigate(['/']);
    }
  }

  loginUser(data: Login) {
    this.http.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((result: any) => {
      if (result && result.body && result.body.length > 0) {
        localStorage.setItem('userData', JSON.stringify(result.body[0]));
        this.router.navigate(['/']);
      } else {
        this.isError.emit(true);
        console.log("Login failed");
      }
    });
  }
}
