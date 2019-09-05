import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  baseurl: string;

  constructor(public http:HttpClient) {
    this.baseurl='/api/v1/users';
   }
   public signup=(data):any=>{
     let params=new HttpParams()
     .set("firstName",data.firstName)
     .set("lastName",data.lastName)
     .set("email",data.email)
     .set("password",data.password)
     .set("mobileNumber",data.mobileNumber)
     .set("countryCode",data.countryCode)
     let datas=this.http.post(`${this.baseurl}/signup`,params);
     return datas;
   }
   public signin=(data):any=>{
     let params=new HttpParams()
     .set("email",data.email)
     .set("password",data.password)
     let datas=this.http.post(`${this.baseurl}/signin`,params);
     return datas;
   }
   public createevent=(data):any=>{
     let params=new HttpParams()
     .set("userId",data.userId)
     .set("event",data.event)
     .set('Done',data.Done)
     let datas=this.http.post(`${this.baseurl}/createtodo`,params)
     return datas;
   }
   public getevents=(userId):any=>{
     let datas=this.http.get(`${this.baseurl}/gettodo/${userId}`)
     return datas;
   }
   public delete=(options):any=>{
     let params=new HttpParams()
     .set("statusId",options.statusId)
     let datas=this.http.post(`${this.baseurl}/delete`,params)
     return datas;
   }
   public getevent=(statusId):any=>{
    let datas=this.http.get(`${this.baseurl}/getevent/${statusId}`);
    return datas;
   }
   public edit=(data):any=>{
     let params=new HttpParams()
     .set("userId",data.userId)
     .set("event",data.event)
     .set("statusId",data.statusId)
     .set("Done",data.Done)
     let datas=this.http.post(`${this.baseurl}/update`,params);
     return datas;
   }
   public getusers=():any=>{
     let datas=this.http.get(`${this.baseurl}/getusers`);
     return datas;
   }
   public sendrequest=(data):any=>{
    let params=new HttpParams()
    .set("receiverId",data.receiverId)
    .set("senderId",data.senderId)
    .set("firstName",data.firstName)
    .set("lastName",data.lastName)
    let datas=this.http.post(`${this.baseurl}/sendrequest`,params);
    return datas;
   }
   public getrequest=(userId):any=>{
     let datas=this.http.get(`${this.baseurl}/getrequest/${userId}`);
     return datas;
   }
   public acceptrequest=(data):any=>{
     let params=new HttpParams()
     .set("friendreqId",data.friendreqId)
    let datas=this.http.post(`${this.baseurl}/acceptrequest`,params);
    return datas;
   }
   public getfriends=(userId):any=>{
     let datas=this.http.get(`${this.baseurl}/getfriends/${userId}`);
     return datas;
   }
   public unfriend=(data):any=>{
     let params=new HttpParams()
     .set("friendId",data.friendId)
      let datas=this.http.post(`${this.baseurl}/unfriend`,params);
      return datas;
   }
   public deletefrnfreq=(data):any=>{
     let params=new HttpParams()
     .set("friendreqId",data.friendreqId);
     let datas=this.http.post(`${this.baseurl}/deletefriendrequest`,params);
     return datas;
   }
   public sendcode=(data):any=>{
     let params=new HttpParams()
     .set("email",data.email)
      let datas=this.http.post(`${this.baseurl}/resetcode`,params);
      return datas;
   }
   public resetPassword=(data):any=>{
     console.log(data)
     let params=new HttpParams()
     .set("password",data.password)
     .set("resetId",data.resetId)
     let datas=this.http.post(`${this.baseurl}/resetpassword`,params);
     return datas;
   }
   public undo=(statusId):any=>{
     let params=new HttpParams()
     .set('statusId',statusId);
     let datas=this.http.post(`${this.baseurl}/undo`,params);
     return datas;
   }
   public savehistory=(statusId):any=>{
     let params=new HttpParams()
     .set('statusId',statusId);
     let datas=this.http.post(`${this.baseurl}/savehistory`,params)
     return datas;
   }
}
