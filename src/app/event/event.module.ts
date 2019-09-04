import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComponent } from './event/event.component';
import { RouterModule } from '@angular/router';
import { CreateEventComponent } from './create-event/create-event.component';
 import {FormsModule} from '@angular/forms';
import { EditComponent } from './edit/edit.component'


@NgModule({
  declarations: [EventComponent, CreateEventComponent, EditComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild ([
      {path:"event/:userId",component:EventComponent},
      {path:"createevent/:userId",component:CreateEventComponent},
      {path:"edit/:statusId",component:EditComponent}
    ])
  ]
})
export class EventModule { }
