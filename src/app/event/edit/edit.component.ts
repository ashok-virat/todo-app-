import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ThrowStmt, IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  userId: string;
  statusId: string;
 
  currendata: any;
  data: any;
  event:any;
  Done:any;
  editloader: boolean;
  constructor(public service:ServiceService,public toastr: ToastrService,public router:Router,public _route:ActivatedRoute) { 
    this.statusId=this._route.snapshot.paramMap.get("statusId");
     this.geteventbystatusId();
  }

  ngOnInit() {
  }
  public geteventbystatusId=()=>{
    this.service.getevent(this.statusId).subscribe(
      data=>{
       this.data=data.data;
       this.userId=data.data.userId;
        this.currendata=data["data"];
      },
      err=>{
        this.toastr.error('some error occured')
      }
    )
  }
  public edit=()=>{
    this.editloader=false;
    if(this.currendata.event.length<4 || this.currendata.event.length>25){
      this.toastr.warning('please provide your event letters 4 to 25')
    }
    else if(this.currendata.Done ==='Yes' || this.currendata.Done ==='No'){
      this.service.edit(this.currendata).subscribe(
        data=>{
          this.editloader=true;
           this.toastr.success(data.message);
           setTimeout(() => {
             this.router.navigate(['/event',this.userId])
           }, 2000);
        },
        err=>{
          this.editloader=true;
          this.toastr.error('some error occured')
        }
  )
    }
  else {
    this.toastr.warning('please provide Yes or No')
  }
  }
  
}
