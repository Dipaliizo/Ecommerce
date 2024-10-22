import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { SocialAuthService, FacebookLoginProvider, GoogleLoginProvider, MicrosoftLoginProvider } from '@abacritt/angularx-social-login';
import { UserService } from '../../services/user.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  
  form = {
    email: '',
    password: ''
  };

  private readonly oidcSecurityService = inject(OidcSecurityService);

 constructor(private router: Router,private authService: SocialAuthService,private userService: UserService,private auth:AuthService,private toastr: ToastrService, private cdr: ChangeDetectorRef) {}
  user: any;
  loggedIn: boolean = false;
  submitted: boolean = false;

  
  ngOnInit() {
    this.auth.handleRedirect();
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      
      if (this.loggedIn) {
        const loggedInUser = {
          id: this.user.id,
          name: this.user.name,
          email: this.user.email,
          photoUrl: this.user.photoUrl
        };
        this.userService.updateUserData(loggedInUser);
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        this.toastr.success('Login Successfully !', '', { timeOut: 2000 });
        this.router.navigate(['shop']);
      } else {
        this.userService.updateUserData(null);
        localStorage.removeItem('loggedInUser');
      }
  
      this.cdr.detectChanges();
    });
  }
  
  
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithMicrosoft(): void {
    this.authService.signIn(MicrosoftLoginProvider.PROVIDER_ID);
  }

  loginWithGithub() {
    this.auth.login();
  }
  signOut(): void {
    this.authService.signOut().then(() => {
      localStorage.removeItem('loggedInUser');
      this.user = null; 
      this.cdr.detectChanges();
      this.router.navigate(['login']); 
    });
  }
  
  private hashPassword(password: string): string {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    return btoa(password);
  }

  ngAfterViewInit() {
    this.initializeStaticUser();
}

initializeStaticUser() {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const staticUser = storedUsers.find((user: { email: string }) => user.email === 'test@example.com');

    if (!staticUser) {
        const staticUserData = {
            id: '1',
            email: 'user@gmail.com',
            password: this.hashPassword('user123'),
            name: 'Test User'
        };
        storedUsers.push(staticUserData);
        localStorage.setItem('users', JSON.stringify(storedUsers));
    }
}

onSubmit(signInForm: NgForm) {
  this.submitted = true;
  if (signInForm.invalid) {
      let firstInvalidControl = null;
      for (const control in signInForm.controls) {
          if (signInForm.controls[control].invalid) {
              firstInvalidControl = control;
              break;
          }
      }
        if (firstInvalidControl) {
          const elem = document.querySelector(`[formControlName="${firstInvalidControl}"]`) as HTMLElement;
          elem.focus();
        }
    } else {
      const { email, password } = this.form;
      const hashedPassword = this.hashPassword(password);
  
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
  
      const user = storedUsers.find((user: { email: string; password: string; }) =>
        user.email === email && user.password === hashedPassword
      );
  
      if (user) {
        this.toastr.success("Login Successfully !",'',{timeOut:2000});
        const loggedInUser = {
          email: user.email,
          id: user.id,
          name: user.name
        };
        this.userService.updateUserData(loggedInUser);
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        signInForm.resetForm();
        this.form = {
          email: '',
          password: ''
        };
  
        this.router.navigate(['shop']); 
  
      }  else {
        const userEmail = storedUsers.find((user: { email: string; }) => user.email === email);
        const userPassword = storedUsers.find((user: { password: string; }) => user.password === hashedPassword);
  
        if (userEmail && !userPassword) {
          this.toastr.warning('Password is incorrect. Please try again.', '', { timeOut: 3000 });
        } else if (!userEmail && userPassword) {
          this.toastr.warning('Email is incorrect. Please try again.', '', { timeOut: 3000 });
        } else {
          this.toastr.error('Invalid email or password. Please try again.', '', { timeOut: 3000 });
        }
      }
  }
}
}
