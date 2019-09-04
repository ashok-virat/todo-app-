import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SigninComponent } from './user/signin/signin.component';
import { RouterModule } from '@angular/router';
import { UserModule } from './user/user.module';
import {FormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { EventModule } from './event/event.module';
import { FriendModule } from './friend/friend.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    FriendModule,
    UserModule,
    EventModule,
    RouterModule.forRoot ([
      {path:'signin',component:SigninComponent,pathMatch:'full'},
      {path:'',redirectTo:'signin',pathMatch:'full'},
      {path:"*",component:SigninComponent},
      {path:"**",component:SigninComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
