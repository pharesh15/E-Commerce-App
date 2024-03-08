import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignUp } from '../../model/SignUp';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private userSerivce: UserService) { }

  handleRegister(userData: SignUp) {
    this.userSerivce.registerUser(userData).subscribe((result) => {
      console.log(result);
    });
  }
}
