import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  firstName: any;
  lastName: any;
  email: any;
  password: any;
  mobileNumber: any;
  countryCode: any;
  signuploader: boolean;

  constructor(public service:ServiceService,public toastr: ToastrService,public router:Router) { }

  ngOnInit() {
  }
public signup=()=>{
 
  if(this.countryCode.toString().length>1 && this.countryCode.toString().length<3){
  this.signuploader=false;
  let data={
    firstName:this.firstName,
    lastName:this.lastName,
    email:this.email,
    password:this.password,
    mobileNumber:this.mobileNumber,
    countryCode:this.countryCode
  }
  this.service.signup(data).subscribe(
    data=>{
      if(data.error==true){
        this.toastr.error(data.message);
        this.signuploader=true;
      
      }
      else {
        this.signuploader=true;
        this.toastr.success(data.message);
        setTimeout(() => {
          this.router.navigate(['/signin']);
        },2000);
      }
    },
    err=>{
      this.signuploader=true;
      this.toastr.error('some error occured');
    }
  )
}
else {
  this.toastr.warning('please provide your country code in 2 digits')
}
}
}
