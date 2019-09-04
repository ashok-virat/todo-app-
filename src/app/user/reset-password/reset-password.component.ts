import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  email: any;
  password: any;
  resetcode: any;
  sendresetcoode: boolean;
  resetloder: boolean;

  constructor(public service:ServiceService,public toastr: ToastrService,public router:Router) { 

  }

  ngOnInit() {
  }
    public sendcode=()=>{
      let option={
        email:this.email
      }
      this.sendresetcoode=false;
      this.service.sendcode(option).subscribe(
        data=>{
                if(data.error==true){
                  this.sendresetcoode=true;
                  this.toastr.error(data.message)
                }
                else {
                  this.sendresetcoode=true;
                  this.toastr.success(data.message)
                  
                }
        },
        err=>{
          this.toastr.error('some error occured')
          this.sendresetcoode=true;
        }
      )
    }
    public resetpassword=()=>{
      let option={
        password:this.password,
        resetId:this.resetcode
      }
        this.resetloder=false;
      this.service.resetPassword(option).subscribe(
        data=>{
        if(data.error==true){
          this.resetloder=true;
          this.toastr.error(data.message)
        }
        else {
          this.resetloder=true;
          this.toastr.success(data.message)
          setTimeout(() => {
            this.router.navigate(['/signin']);
          },1000);
        }
          
        },
        err=>{
          this.resetloder=true;
          this.toastr.error('some error occured')
        }
      )
    }
}
