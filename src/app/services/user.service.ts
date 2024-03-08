import { Injectable } from '@angular/core';
import { SignUp } from '../model/SignUp';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(data: SignUp) {
    return this.http.post("http://localhost:3000/users", data);
  }
}
