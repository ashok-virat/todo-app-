import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { SocketserviceService } from 'src/app/socketservice.service';

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css']
})
export class FriendRequestComponent implements OnInit {
  userId: string;
  data: any;
  reqcount: any;

  constructor(public service:ServiceService,public toastr: ToastrService,public router:Router,public _route:ActivatedRoute,public socketService:SocketserviceService) {
    this.userId=this._route.snapshot.paramMap.get('userId');
      this.getrequest();
    
   }

  ngOnInit() {
    
  }
    public getrequest=()=>{
      this.service.getrequest(this.userId).subscribe(
          data=>{
            this.data=data.data;
            this.reqcount=this.data.length;
          },
          err=>{
            this.toastr.error('some error occured')
          }
      )
    }
    public acceptrequest=(friendreqId)=>{
      let option={
        friendreqId:friendreqId
      }
         this.service.acceptrequest(option).subscribe(
           data=>{
             data.data.message=`${data.data.receiverfirstName} ${data.data.receiverlastname} accept your friend request`;
              this.socketService.acceptfriendrequest(data.data);
              this.getacceptreq();
              this.getrequest();
           },
           err=>{
             this.toastr.error('some error occured')
           }
         )
    }
    public deletefrndreq=(friendreqId)=>{
      this.socketService.deletefriendrequest(friendreqId);
      this.deletereq();
      let options={
        friendreqId:friendreqId
      }
      this.service.deletefrnfreq(options).subscribe(
        data=>{
          this.toastr.success(data.message);
          this.getrequest();
          
        },
        err=>{
          this.toastr.error('some error occured')
        }
      )
    }
  
      public getacceptreq=()=>{
    
        this.socketService.getacceptrequest(`${this.userId} acceptreq`).subscribe(
        data=>{
          this.toastr.success(data.message)
        
        },
        err=>{
          this.toastr.error('some error occured')
        }
        )
      }
      public deletereq=()=>{
        this.socketService.getdeleterequest(`${this.userId} deletereq`).subscribe(
          data=>{
            this.toastr.error(`${data.receiverfirstName} ${data.receiverlastname} delete your friend request`)
          },
          err=>{
            this.toastr.error('some error occured')
          }
        )
      }
}
