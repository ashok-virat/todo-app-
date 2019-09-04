import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FriendListComponent } from './friend-list/friend-list.component';
import { FriendRequestComponent } from './friend-request/friend-request.component';
import { FrndEventEditComponent } from './frnd-event-edit/frnd-event-edit.component';



@NgModule({
  declarations: [UsersComponent, FriendListComponent, FriendRequestComponent, FrndEventEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild ([
      {path:"users/:userId",component:UsersComponent},
      {path:"friend-request/:userId",component:FriendRequestComponent},
      {path:"friends/:userId",component:FriendListComponent},
      {path:"friend-event-edit/:statusId",component:FrndEventEditComponent}
    ])
  ]
})
export class FriendModule { }
