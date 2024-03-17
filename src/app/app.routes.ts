import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SellerHomeComponent } from './components/seller-home/seller-home.component';
import { authGuard } from './auth.guard';
import { SellerAuthComponent } from './components/seller-auth/seller-auth.component';
import { SellerAddProductComponent } from './components/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './components/seller-update-product/seller-update-product.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'seller-auth', component: SellerAuthComponent },
    { path: 'login', component: LoginComponent },
    { path: 'seller-home', component: SellerHomeComponent, canActivate: [authGuard] },
    { path: 'seller-add-product', component: SellerAddProductComponent, canActivate: [authGuard] },
    { path: 'seller-update-product/:id', component: SellerUpdateProductComponent, canActivate: [authGuard] }
];
