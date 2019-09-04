import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {Cookie} from "ng2-cookies/ng2-cookies";
declare var $:any;
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  password: any;
  email: any;
  fullname: any;
  signinloader: boolean;

  constructor(public service:ServiceService,public toastr: ToastrService,public router:Router) { }

  ngOnInit() {
  }
 public signin=()=>{
   this.signinloader=false;
   let data={
     email:this.email,
     password:this.password
   }
   this.service.signin(data).subscribe(
     data=>{
      this.signinloader=true;
       if(data.error==false){
         this.toastr.success(data.message)
         this.fullname=`${data.data.firstName} ${data.data.lastName}`;
         Cookie.set('fullname',this.fullname);
         setTimeout(() => {
           this.router.navigate(['./event',data.data.userId])
         }, 3000);
       }
       else {
         this.toastr.error(data.message)
       }
     },
     err=>{
      this.signinloader=true;
       this.toastr.error('some error occured');
     }
   )
 }
 
}
