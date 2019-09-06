import { Injectable } from '@angular/core';
import {Observable, observable} from "rxjs";
import {Cookie} from "ng2-cookies/ng2-cookies";
import io from 'socket.io-client';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class SocketserviceService {
  socket: any;
  baseUrl: string;
  userId: string;

        
  constructor(public toastr: ToastrService,public service:ServiceService) { 
   
    this.baseUrl='/';
       this.socket=io(this.baseUrl);
  } 


      //verify and setuser code is called
      public verifyUser:any=()=>{
      let ak=Observable.create((observer)=>
      {
        this.socket.on('verifyUser',(data)=>{
          observer.next(data);
        }) 
      }) 
       return ak;
      } 
      public setUser=(userId)=>{
        this.socket.emit('set-user',userId);
      }
      //verify and setuser code is end


      //send friend request code start
      public sendfriendrequest=(data)=>{
        this.socket.emit('friendrequest',data);
      }
      public getfriendrequest=(userId)=>{
         let datas=Observable.create((observer)=>{
           this.socket.on(userId,(result)=>{
             observer.next(result);
           })
         })
          return datas;
      }
       //send friend request code start


     //acceptfriendrequest code start
      public acceptfriendrequest=(data)=>{
          this.socket.emit('acceptrequest',data);
      }
      public getacceptrequest=(userId)=>{
        let datas=Observable.create((observer)=>{
          this.socket.on(userId,(result)=>{
            observer.next(result);
          })
        })
         return datas;
      }
      //acceptfriendrequest code end


      //deletefriendrequest code start
      public deletefriendrequest=(data)=>{
        this.socket.emit('deleterequest',data);
      }
      public getdeleterequest=(userId)=>{
        let datas=Observable.create((observer)=>{
          this.socket.on(userId,(result)=>{
            observer.next(result);
          })
        })
         return datas;
      } 
      //deletefriendrequest code start


      //getunfriendmsg code start
      public unfriendmsg=(data)=>{
        this.socket.emit('unfriendmsg',data);
      }
        public getunfriendmsg=(userId)=>{
          let datas=Observable.create((observer)=>{
            this.socket.on(userId,(result)=>{
              observer.next(result);
            })
          })
           return datas;
        }
        //getunfriendmsg code end


       //onlineuserlist code strat 
      public onlineUserList=()=>{
        let ak=Observable.create((observer)=>{
          this.socket.on('online-user-list',(result)=>{
            observer.next(result)
          })
        })
        return ak;
      }
       //onlineuserlist code end


       //disconnected code start
      public disconnectedSocket=()=>{
        let ak=Observable.create((observer)=>{
          this.socket.emit("disconnect",()=>{
            observer.next();
          })
        })
        return ak;
      }
      //disconnected code end

      
      //exit socket code start
     public exitsocket=()=>{
      this.socket.disconnect();
     }
      //exit socket code end
      

      //friedstododelete code start
      public friendstododelete=(senderId,receiverId)=>{
      this.socket.emit('friendtododelete',senderId,receiverId);
      }
      public getfriendstododelete=(receiverId)=>{
        let ak=Observable.create((observer)=>{
          this.socket.on(receiverId,(data)=>{
            observer.next(data)
          })
        })
        return ak;
      }
      //friedstododelete code start      


      
  }

