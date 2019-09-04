import { Component, OnInit } from '@angular/core';
import {Cookie} from "ng2-cookies/ng2-cookies";
import { ServiceService } from 'src/app/service.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { SocketserviceService } from 'src/app/socketservice.service';
declare var $:any;
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  fullname: any;
  userId: any;
  data: any;
  reqcount: any;
  request: any;
  length: any;

  constructor(public service:ServiceService,public toastr: ToastrService,public router:Router,public _route:ActivatedRoute,public socketService:SocketserviceService) { 
    this.fullname=Cookie.get('fullname');
    this.userId=this._route.snapshot.paramMap.get('userId');
    this.getevents();
    this.getrequest();
    this.verifyUser();
    this.getonlineUsers();
  }
   
  ngOnInit() {
  }

  public verifyUser=()=>{
         this.socketService.verifyUser().subscribe(
           data=>{
             this.socketService.setUser(this.userId);
           },
           err=>{
             this.toastr.error('some error occured')
           }
         )
  }
  public getonlineUsers=()=>{
    this.socketService.onlineUserList().subscribe(
      data=>{
        console.log(data)
      },
      err=>{
        this.toastr.error('some error occured')
      }
    )
  }

  public getevents=()=>{
    this.service.getevents(this.userId).subscribe(
      data=>{
        this.data=data.data;
        this.length=this.data.length;
    },
    err=>{
      this.toastr.error('some error occured')
    }
    
    )
  }
  public delete=(statusId)=>{
   let option={
     statusId:statusId
   }
   this.service.delete(option).subscribe(
     data=>{
       this.toastr.success(data.message)
       this.getevents();
     },
     err=>{
       this.toastr.error('some error occured')
     }
   )
  }
  public getrequest=()=>{
    this.service.getrequest(this.userId).subscribe(
        data=>{
         this.request=data.data;
          this.reqcount=this.request.length;
        },
        err=>{
          this.toastr.error('some error occured')
        }
    )
  }
   public logout=()=>{
     Cookie.delete('fullname');
     Cookie.delete('userId');
     this.socketService.exitsocket();
     this.socketService.disconnectedSocket();
     this.toastr.success('logout successfully')
   }
}
