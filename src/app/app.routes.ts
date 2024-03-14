import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SellerHomeComponent } from './components/seller-home/seller-home.component';
import { authGuard } from './auth.guard';
import { SellerAuthComponent } from './components/seller-auth/seller-auth.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'seller-auth', component: SellerAuthComponent },
    { path: 'login', component: LoginComponent },
    { path: 'seller-home', component: SellerHomeComponent, canActivate: [authGuard] }
    // { path: 'seller-auth', component: SellerAuthComponent }
];
