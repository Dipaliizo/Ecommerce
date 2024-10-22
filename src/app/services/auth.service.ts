import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
declare var google:any;
declare global {
  interface Window {
    FB: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private clientId = 'Ov23liXb1nt2SCv2nGyZ';
  private clientSecret = '5e4cd27d84b7c0ddcded40ca985e3926a860135c';
  private redirectUri = 'http://localhost:4200'; 

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();
  authState: any;

  constructor(private router: Router,private oauthService: OAuthService,private http: HttpClient) { 
    // this.configure();
    const user = JSON.parse(localStorage.getItem("loggedInUser") || 'null');
    if (user) {
      this.userSubject.next(user);
    }
  }

  setUser(user: any): void {
    this.userSubject.next(user);
  }

  clearUser(): void {
    this.userSubject.next(null);
  }

  signOut(): void {
    if (typeof google !== 'undefined' && google.accounts) {
      google.accounts.id.disableAutoSelect();
    } else {
      console.warn('Google API not available.');
    }
    this.clearUser(); 
    localStorage.removeItem("loggedInUser");
    this.router.navigate(['home']);
  }

  initFacebookSDK(): void {
    if (window.FB) {
      window.FB.getLoginStatus((response: any) => {
        console.log('FB getLoginStatus response:', response);
      });
    }
  }

  loginWithFacebook(): void {
    if (window.FB) {
      (window as any).FB.login((response: any) => {
        if (response.status === 'connected') {
          console.log('Successfully logged in:', response);
        } else {
          console.error('Login failed:', response);
        }
      }, {scope: 'public_profile,email'});
    }
  }

  logout(): void {
    if (window.FB) {
      (window as any).FB.login((response: any) => {
        console.log('Successfully logged out:', response);
      });
    }
  }
  // login() {
  //   const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${this.clientId}`;
  //   const width = 500;
  //   const height = 600;
  //   const left = (window.screen.width - width) / 2;
  //   const top = (window.screen.height - height) / 2;
  //   const popup = window.open(githubAuthUrl, 'GitHub Login', `width=${width},height=${height},left=${left},top=${top}`);
  //   if (popup) {
  //     popup.focus();
  //   } else {
  //     console.log('Popup blocked or disabled. Please allow popups to continue.');
  //   }
  // }

  login() {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=read:user`;
    window.location.href = githubAuthUrl;
  }

  handleRedirect() {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');
    if (code) {
      const accessTokenUrl = `https://github.com/login/oauth/access_token?client_id=${this.clientId}&client_secret=${this.clientSecret}&code=${code}`;
      
      fetch(accessTokenUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
      })
      .then(response => response.json())
      .then(data => {
        const accessToken = data.access_token;
        this.fetchUserData(accessToken);
      })
      .catch(error => {
        console.error('Error during token exchange:', error);
      });
    }
  }

  private fetchUserData(accessToken: string) {
    this.http.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .subscribe(
      (userData) => {
        localStorage.setItem('loggedInUser', JSON.stringify(userData));
        this.router.navigate(['/']); 
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  getUser() {
    return JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  }

  isLoggedIn() {
    return !!localStorage.getItem('loggedInUser');
  }

  githublogout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/signin']);
  }

  // private configure() {
  //   this.oauthService.configure({
  //     clientId: this.clientId,
  //     redirectUri: this.redirectUri,
  //     scope: 'user:email',
  //     responseType: 'code',
  //     requireHttps: true,
  //     loginUrl: 'https://github.com/login/oauth/authorize',
  //     tokenEndpoint: 'https://github.com/login/oauth/access_token',
  //     userinfoEndpoint: 'https://api.github.com/user',
  //   });
  // }

  // login() {
  //   this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
  //     this.oauthService.initImplicitFlow(); 
  //   });
  // }

  // signout() {
  //   this.oauthService.logOut();
  // }

  // get identity() {
  //   return this.oauthService.getIdentityClaims();
  // }
}
