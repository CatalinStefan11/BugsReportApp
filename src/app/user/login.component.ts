import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './user2'

import { AuthService } from './auth.service';
import { error } from 'protractor';


@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  errorMessage: string;
  currentUser: User;
  showErrorMessage = false;
  pageTitle = 'Log In';


  constructor(private authService: AuthService,
    private router: Router) { }

  login(loginForm: NgForm) {

    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;

      var user = {
        email: userName,
        password: password
      }
      this.authService.login(user).subscribe(
        (data) => {
          if(data){
          this.currentUser = data;
          this.router.navigate(['/projects']);
          }
        },
        (error) => {
          this.showErrorMessage = true;
        }
        
      );

      
      

    }

    if(this.showErrorMessage) {
      this.errorMessage = 'Please enter a valid email and password!';
    }
  }





}
