import { Component } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js'; 

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent {
  email: string = '';
  newpassword: string = '';
  confpassword: string = '';
  submitted: boolean = false;

  constructor(private router: Router) {}
 
  onSubmit(form: NgForm) {
    this.submitted = true;
    if (form.invalid) {
      return;
    }
  
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: { email: string }) => u.email === this.email);
  
    if (user) {
      if (this.newpassword === this.confpassword) {
        const hashedPassword = CryptoJS.SHA256(this.newpassword).toString(CryptoJS.enc.Hex);
        user.password = hashedPassword;
  
        localStorage.setItem('users', JSON.stringify(users));
  
        alert('Password has been reset successfully.');
        form.reset();
       this.router.navigate(['signin']);
      } else {
        // alert('Passwords do not match.');
      }
    } else {
      alert('No user found with the provided email address.');
    }
  }
  
}
