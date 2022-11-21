import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '@shared';
import { DialogDetailModule } from '@utils/components/dialog/dialog-detail';
import { GirdBaseModule } from '@utils/components/grid';



@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    GirdBaseModule,
    MatDialogModule,
    DialogDetailModule
  ]
})
export class UserModule { }
