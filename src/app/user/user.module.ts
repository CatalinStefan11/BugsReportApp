import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent}
    ])
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ]
})
export class UserModule { }
