import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  userId: string;
  event: any;
  todoloader: boolean;

  constructor(public service:ServiceService,public toastr: ToastrService,public router:Router,public _route:ActivatedRoute) { 
    this.userId=this._route.snapshot.paramMap.get("userId");
  }

  ngOnInit() {
 
  }
  public createevent=()=>{
   this.todoloader=false;
    if(this.event.length<25 && this.event.length>3){
      let data={
        userId:this.userId,
        event:this.event,
        Done:'No'
      }
      this.event='';
      this.service.createevent(data).subscribe(
        (data)=>{
          this.todoloader=true;
          this.toastr.success(data.status);
          setTimeout(() => {
            this.router.navigate(["/event",this.userId])
          }, 2000);
        }
      ),
      err=>{
        this.todoloader=true;
        this.toastr.error('some error occured')
      }
    }
    else {
      this.todoloader=true;
      this.toastr.warning('please provide your event letters 4 to 25')
    }
    }
 
    
}
