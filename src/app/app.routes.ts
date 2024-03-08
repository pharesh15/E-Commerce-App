import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
// import { SellerAuthComponent } from './components/seller-auth/seller-auth.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent }
    // { path: 'seller-auth', component: SellerAuthComponent }
];
