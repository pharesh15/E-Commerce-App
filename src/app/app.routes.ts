import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SellerHomeComponent } from './components/seller-home/seller-home.component';
import { authGuard } from './auth.guard';
import { SellerAuthComponent } from './components/seller-auth/seller-auth.component';
import { SellerAddProductComponent } from './components/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './components/seller-update-product/seller-update-product.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrdersComponent } from './components/orders/orders.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'seller-auth', component: SellerAuthComponent },
    { path: 'login', component: LoginComponent },
    { path: 'seller-home', component: SellerHomeComponent, canActivate: [authGuard] },
    { path: 'seller-add-product', component: SellerAddProductComponent, canActivate: [authGuard] },
    { path: 'seller-update-product/:id', component: SellerUpdateProductComponent, canActivate: [authGuard] },
    { path: 'search/:query', component: SearchComponent },
    {path: 'details/:id', component: ProductDetailsComponent},
    {path: 'user-auth', component: UserAuthComponent},
    {path: 'cart', component: CartComponent},
    {path: 'checkout', component: CheckoutComponent},
    {path: 'orders', component: OrdersComponent}
  ];
