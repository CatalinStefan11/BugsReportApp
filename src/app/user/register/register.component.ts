import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  errorMessage: string;
  pageTitle = 'Register';


  constructor(private userService: UserService,
    private router: Router) { }

  login(loginForm: NgForm) {

    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;

      var user = {
        email: userName,
        password: password
      }
      this.userService.createUser(user).subscribe(
        (data) => {
          this.router.navigate(['/login']);
        }
      );

    }
  }
}