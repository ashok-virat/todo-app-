import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { SocketserviceService } from 'src/app/socketservice.service';

@Component({
  selector: 'app-frnd-event-edit',
  templateUrl: './frnd-event-edit.component.html',
  styleUrls: ['./frnd-event-edit.component.css']
})
export class FrndEventEditComponent implements OnInit {
  statusId: string;
  data: any;
  userId: any;
  currendata: any;
  friendeditloader: boolean;

  constructor(public service:ServiceService,public toastr: ToastrService,public router:Router,public _route:ActivatedRoute,public socketService:SocketserviceService) { 
    this.statusId=this._route.snapshot.paramMap.get("statusId");
     this.geteventbystatusId();
     this.userId= Cookie.get('userId');
  }

  ngOnInit() {
     
  }
  public geteventbystatusId=()=>{
    this.service.getevent(this.statusId).subscribe(
      data=>{
        console.log(data)
       this.data=data.data;
        this.currendata=data["data"];
        console.log(this.currendata)
      },
      err=>{
        this.toastr.error('some error occured')
      }
    )
  }
  public edit=()=>{
    console.log(this.currendata.userId)

    this.friendeditloader=false;
    if(this.currendata.event.length<4 || this.currendata.event.length>25){
      this.toastr.warning('please provide your event letters 4 to 25')
    }
    else if(this.currendata.Done ==='Yes' || this.currendata.Done ==='No'){
      this.service.edit(this.currendata).subscribe(
        data=>{
          this.friendeditloader=true;
           this.toastr.success(data.message);
           setTimeout(() => {
            console.log(this.userId);
             this.router.navigate(['/friends',this.userId])
           }, 2000);
        },
        err=>{
          this.toastr.error('some error occured')
        }
  )
    }
   
    else {
      this.friendeditloader=true;
      this.toastr.warning('please provide Yes or No')
    }
    
  }

}
