declare var google:any;
import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from 'express';
import { AuthService } from '../../services/auth.service';
import { Auth2Service } from '../../services/auth2.service';
import { environment } from '../../environment/environment';
declare global {
  interface Window {
    FB: any;
  }
}
declare var FB:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  private router = inject(Router);
  private authService = inject(AuthService);
  constructor(private elementRef: ElementRef, private auth2Service:Auth2Service) { }

  
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '737093146504-aufejoo17oe9g2u019o9rcudetaor82c.apps.googleusercontent.com',
      callback:(response:any)=> this.handleLogin(response),
      auto_select: false,
    });

    google.accounts.id.renderButton(document.getElementById("google-btn"),{
      size: 'large',
      shape: 'rectangle',
      width: 375,
      text: 'continue_with',
      logo_alignment: 'center',
      type: 'standard',
      theme: 'outline',
      
    })   
    
  }

  private decodeToken(token: string){
    return JSON.parse(atob(token.split(".")[1]));
  }

 handleLogin(response: any){
   if(response && response.credential){
      const payLoad = this.decodeToken(response.credential);
      localStorage.setItem("loggedInUser", JSON.stringify(payLoad));
      this.authService.setUser(payLoad);
      this.router.navigate(['shop']);
   }
 }
 

  closePopup(): void {
    this.elementRef.nativeElement.remove();
    this.router.navigate(['/']);
  }

  private readonly clientId = environment.clientId;
  private readonly redirectUri = environment.redirectUri;
  private readonly scope = 'openid profile email';
isLoading: any;
errorMessage: any;
authCode: any;


  loginWithLinkedIn(): void {
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=${this.scope}`;
    window.location.href = authUrl;
  }

  handleLinkedInAuthorizationCode(code: string): void {
    this.auth2Service.getAccessToken(code).subscribe((response: any) => {
      console.log(response);
    });
    
  }

  ngafterView(): void {
    if (window.FB) {
      FB.init({
        appId: '1943091546161363',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v20.0'
      });
    }
  }

  loginWithFacebook(): void {
    FB.login((response: { status: string; authResponse: { accessToken: any; userID: any; }; }) => {
      if (response.status === 'connected') {
        const userId = response.authResponse.userID;

        FB.api('/me', { fields: 'id, first_name, last_name, email' }, (response: any) => {
          if (response && !response.error) {
            const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
            const userExists = storedUsers.some((user: { id: string; }) => user.id === userId);
            if (userExists) {
              const existingUser = storedUsers.find((user: { id: string; }) => user.id === userId);
              localStorage.setItem('loggedInUser', JSON.stringify(existingUser));
              this.router.navigate(['myaccount']); 
              return;
            }

            const newUser = {
              id: userId, 
              firstname: response.first_name,
              lastname: response.last_name,
              email: response.email || `${response.id}@facebook.com`, // Generate a dummy email if not available 
            };

            storedUsers.push(newUser);
            localStorage.setItem('users', JSON.stringify(storedUsers));

            // Log the user in
            localStorage.setItem('loggedInUser', JSON.stringify(newUser));
            this.router.navigate(['myaccount']);
          } else {
            console.log('Error fetching user data:', response.error);
          }
        });
      } else {
        console.log('User login failed');
      }
    }, { scope: 'public_profile' }); 
  }
}
export class LoginModel  { 
  email: string;
  password: string;

  constructor() {
    this.email = ""; 
    this.password= ""
  }
}


function ngafterView() {
  throw new Error('Function not implemented.');
}

