import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { SocketserviceService } from 'src/app/socketservice.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userId: any;
  data: any;
  id: any;
  userIdinuser: string;
  datas: Object;
  ids: any;
  firstName: any;
  lastName: any;
  receiverId: any;
  realmsg: any;
 

  constructor(public service:ServiceService,public toastr: ToastrService,public router:Router,public _route:ActivatedRoute,public socketService:SocketserviceService) { 
    this.userId=this._route.snapshot.paramMap.get('userId');
    this.getusers();
    this.getfriends();
    this.getevents();
   
  }

  ngOnInit() {
    
  }
  public getevents=()=>{
    this.service.getevents(this.userId).subscribe(
      data=>{
        let datas=data.data;
        for(let name of datas){
              this.firstName=name.firstName;
              this.lastName=name.lastName;
        }
    },
    err=>{
      this.toastr.error('some error occured')
    }
    
    )
  }
  public getusers=()=>{
    this.service.getusers().subscribe(
      data=>{
        this.data=data.data;
      },
      err=>{
        this.toastr.error('some error occured')
      }
    )
  }
  public getfriends=()=>{
    this.service.getfriends(this.userId).subscribe(
      data=>{
        this.id=data.data;
         for(let receiver of this.id){
           this.receiverId=receiver.receiverId;
         }
      },
      err=>{
        this.toastr.error('some error occured')
      }
    )
  }
  public sendrequest=(receiverId)=>{
      let options={
        senderId:this.userId,
        receiverId:receiverId,
        firstName:this.firstName,
        lastName:this.lastName
      }
      this.service.sendrequest(options).subscribe(
        data=>{
          if(data.error===true){
              this.toastr.error(data.message)
          }
          else {
            this.toastr.success(data.message);
           data.data.message=`${data.data.senderfirstName} ${data.data.senderlastName} send friend request`;
           this.socketService.sendfriendrequest(data.data);
           this.getreq();
          }
        },
        err=>{
          this.toastr.error('some error occured')
        }
      )
  }
  public getreq=()=>{
    this.socketService.getfriendrequest(`${this.userId} getreq`).subscribe(
      data=>{
        this.toastr.success(data.message)
      },
      err=>{
        this.toastr.error('some error occured')
      }
    )
 }
}
