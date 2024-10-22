import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ServicesComponent } from './pages/services/services.component';
import { LoadingComponent } from './componets/loading/loading.component';
import { ProductComponent } from './componets/product/product.component';
import { ShopComponent } from './pages/shop/shop.component';
import { CartComponent } from './componets/cart/cart.component';
import { WhislistComponent } from './componets/whislist/whislist.component';
import { CheckoutComponent } from './componets/checkout/checkout.component';
import { SignupComponent } from './componets/signup/signup.component';
import { SigninComponent } from './componets/signin/signin.component';
import { ForgetpasswordComponent } from './pages/forgetpassword/forgetpassword.component';
import { PaymentsComponent } from './componets/payments/payments.component';
import { SuccessComponent } from './pages/success/success.component';
import { MyorderComponent } from './pages/myorder/myorder.component';
import { PaymentComponent } from './componets/payment/payment.component';
import { CartTableComponent } from './admin/cart-table/cart-table.component';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserTableComponent } from './admin/user-table/user-table.component';
import { OrderDetailsComponent } from './componets/order-details/order-details.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'navbar', component:NavbarComponent},
  {path:'footer', component:FooterComponent},
  {path:'gallery',component:GalleryComponent},
  {path:'about', component:AboutComponent},
  {path:'contact', component:ContactComponent},
  {path:'services', component:ServicesComponent},
  {path:'adminlogin',component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'signin', component:SigninComponent},
  {path:'loading', component:LoadingComponent},
  {path:'orders/:orderId/:userId',component:OrderDetailsComponent},
  //{path:'product', component:ProductComponent},
  {path:'shop', component:ShopComponent},
  {path:'cart', component:CartComponent},
  {path:'wishlist', component:WhislistComponent},
  {path:'checkout', component:CheckoutComponent},
  {path:'forgetpassword', component:ForgetpasswordComponent},
  { path: 'payments/:orderId', component: PaymentsComponent },
  {path:'success', component:SuccessComponent},
  {path:'myorder', component:MyorderComponent},
  {path:"payment/:orderId/:userId", component:PaymentComponent},
  //{path:'cartTable', component:CartTableComponent},
 {path:'dashboard', component:DashboardComponent},
  { path: '', component: DashboardComponent, children: [
    { path: 'cartTable', component: CartTableComponent },
    { path: 'product/:id', component: ProductComponent },
    { path: 'product', component: ProductComponent },
    {path:'user', component:UserTableComponent}
]},
{ path: '**', redirectTo: '', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
