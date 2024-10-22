import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPayPalModule } from 'ngx-paypal';
import { NgxStripeModule } from 'ngx-stripe';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { OAuthModule } from 'angular-oauth2-oidc';
import { FacebookLoginProvider, GoogleLoginProvider, GoogleSigninButtonModule, MicrosoftLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
// import { LoginComponent } from './componets/login/login.component';
import { LoginComponent } from './admin/login/login.component';
import { ServicesComponent } from './pages/services/services.component';
import { AboutComponent } from './pages/about/about.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FooterComponent } from './pages/footer/footer.component';
import { LoadingComponent } from './componets/loading/loading.component';
import { ProductComponent } from './componets/product/product.component';
import { NgIf } from '@angular/common';
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
import { environment } from './environment/environment';
import { PaymentComponent } from './componets/payment/payment.component';
import { CartTableComponent } from './admin/cart-table/cart-table.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserTableComponent } from './admin/user-table/user-table.component';
import { OrderDetailsComponent } from './componets/order-details/order-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    ServicesComponent,
    AboutComponent,
    GalleryComponent,
    ContactComponent,
    FooterComponent,
    LoadingComponent,
    ProductComponent,
    ShopComponent,
    CartComponent,
    WhislistComponent,
    CheckoutComponent,
    SignupComponent,
    SigninComponent,
    ForgetpasswordComponent,
    PaymentsComponent,
    SuccessComponent,
    MyorderComponent,
    PaymentComponent,
    CartTableComponent,
    DashboardComponent,
    UserTableComponent,
    OrderDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    HttpClientModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    NgxPayPalModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    OAuthModule.forRoot(),
    AuthModule.forRoot({
      config: {
        authority: 'https://github.com/login/oauth/authorize',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'Ov23liXb1nt2SCv2nGyZ',
        scope: 'profile email offline_access',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.Debug,
      },
    }),
    NgxStripeModule.forRoot(environment.stripe.publicKey)
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        lang: 'en',
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            prompt: 'select_account',
            provider: new GoogleLoginProvider(
              '793502898603-3imj3loerkf42s7ag0hhl6n2jima1n29.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1031884631597544')
          },
          {
            id: MicrosoftLoginProvider.PROVIDER_ID,
            provider: new MicrosoftLoginProvider(
              '0611ccc3-9521-45b6-b432-039852002705'
            ),
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
