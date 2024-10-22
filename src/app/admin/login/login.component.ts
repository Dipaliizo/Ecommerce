import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {
  email: string = 'admin@gmail.com';
  password: string = 'admin123';
  errorMessage: string = '';
  showPassword: boolean = false;

  constructor(private router: Router) {}

  onSubmit(form: any) {
    if (form.invalid) {
      this.errorMessage = '*Email and password is required';
      return;
    }

    this.errorMessage = ''; // Clear error message

    if (form.value['email'] === this.email && form.value['password'] === this.password) {
      localStorage.setItem('isAdminLoggedIn', 'true');
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Invalid email or password';
    }
  }

  resetForm(form: any) {
    form.reset();
    this.errorMessage = ''; 
  }

  logout() {
    localStorage.removeItem('isAdminLoggedIn');
    this.router.navigate(['home']);
  }
}
