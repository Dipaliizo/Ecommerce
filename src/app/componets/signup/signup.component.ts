import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import * as CryptoJS from 'crypto-js';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form = {
    name: '',
    lastname: '',
    email: '',
    password: ''
  };
  submitted: boolean = false;

  constructor(private router: Router, private authService: AuthService,private route: ActivatedRoute,private toastr: ToastrService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  private hashPassword(password: string): string {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  }

  onSubmit(signUpForm: NgForm) {
    this.submitted = true;
    if (signUpForm.valid) {
      const newUserEmail = this.form.email;
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

      const emailExists = storedUsers.some((user: { email: string; }) => user.email === newUserEmail);

      if (emailExists) {
        this.toastr.error("An account with this email already exists. Please use a different email.",'',{timeOut:3000});
        return; 
      }

      // Generate a unique user ID
      const userId = uuidv4();
      const hashedPassword = this.hashPassword(this.form.password);
      const newUser = {
        id: userId,
        firstname: this.form.name,
        lastname: this.form.lastname,
        email: newUserEmail,
        password: hashedPassword
      };

      storedUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(storedUsers));
      this.toastr.success("Account created successfully",'',{timeOut:3000});
      signUpForm.resetForm();
      this.form = {
        name: '',
        lastname: '',
        email: '',
        password: ''
      };
      this.router.navigate(['signin']);
    } else {
      // alert('Please fill out all fields correctly.');
    }
  }
}