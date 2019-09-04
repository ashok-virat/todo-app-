import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import {Cookie} from "ng2-cookies/ng2-cookies";
import { SocketserviceService } from 'src/app/socketservice.service';


@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {
  userId: string;
  datas: any;
  data: any;
  fullname: any;
  event: any;
  length: any;
  datalength: void;
  eventlength: any;
  friendsCount: any;
  receiverId: any;
  satausId: any;
  statusId: any;
  getundo: any;

  constructor(public service:ServiceService,public toastr: ToastrService,public router:Router,public _route:ActivatedRoute,public socketService:SocketserviceService) {
    this.userId=this._route.snapshot.paramMap.get('userId');
    this.getfriends();
    Cookie.set('userId',this.userId);
   }

  ngOnInit() {
    
  }
  public getfriends=()=>{
    this.service.getfriends(this.userId).subscribe(
      data=>{
        this.datas=data.data;
        this.friendsCount=this.datas.length;
  
      }
    )
  }
  public getevent=(receiverId)=>{
    this.service.getevents(receiverId).subscribe(
      data=>{ 
        if(data.data.length>0){
        this.event=data.data; 
        this.length=this.event.length;
      
       for(let name of this.event) {
         this.fullname=`${name.firstName} ${name.lastName}`;
       
       }
      
    }
    else {
      this.toastr.error('No events');
          this.length=0;
    }
      }
      
    )
  }
  public delete=(statusId,receiverId)=>{
    this.statusId=statusId;
    this.socketService.friendstododelete(this.userId,receiverId);
    this.service.savehistory(statusId).subscribe(
      data=>{
        
      }
    )
    this.getdeletefriendtodomsg();
    let option={
      statusId:statusId
    }
    this.service.delete(option).subscribe(
      data=>{
        this.getevent(receiverId);
      },
      err=>{
        this.toastr.error('some error occured')
      }
    )
   }

  
   public undo=()=>{
       this.service.undo(this.statusId).subscribe(
         data=>{
           this.getundo=data.data;
           if(this.getundo){
           this.getevent(this.getundo.userId);
           this.toastr.success(data.message)
           }
         },
         err=>{
           this.toastr.error('some error occured')
         }
       )
   }
   public unfriend=(friendId)=>{
    this.socketService.unfriendmsg(friendId);
 
     let options={
       friendId:friendId
     }
     this.service.unfriend(options).subscribe(
       data=>{
         this.toastr.success(data.message)
         this.getfriends();
         this.getunfriendmsg();
       },
       err=>{
         this.toastr.error('some error occured')
       }
     )
   }
   public getunfriendmsg=()=>{
     this.socketService.getunfriendmsg(`${this.userId} unfriendreq`).subscribe(
       data=>{
        this.toastr.error(`${data.receiverfirstName} ${data.receiverlastname} unfriend you`)
       },
       err=>{
         this.toastr.error('some error occured')
       }
     )
   }
 public getdeletefriendtodomsg=()=>{
   this.socketService.getfriendstododelete(`${this.userId} gettododeletemsg`).subscribe(
     data=>{
         this.toastr.success(`${data.senderfirstName} ${data.senderlastName} delete your todo`)
     },
     err=>{
       this.toastr.error('some error occured')
     }
   )
 }

}

