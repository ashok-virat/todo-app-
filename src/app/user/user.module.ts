import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { ResetPasswordComponent } from './reset-password/reset-password.component'


@NgModule({
  declarations: [SignupComponent, SigninComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild ([
      {path:"signup",component:SignupComponent},
      {path:"signin",component:SigninComponent},
      {path:'resetpassword',component:ResetPasswordComponent}
    ])
  ]
})
export class UserModule { }
