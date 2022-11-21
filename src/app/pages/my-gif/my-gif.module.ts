import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyGifComponent } from './my-gif.component';
import { Routes, RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '@shared';
import { DialogDetailModule } from '@utils/components/dialog/dialog-detail';
import { GirdBaseModule } from '@utils/components/grid';


const routes: Routes = [
  {
    path: '',
    component: MyGifComponent,
  }
];

@NgModule({
  declarations: [
    MyGifComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    GirdBaseModule,
    MatDialogModule,
    DialogDetailModule
  ]
})
export class MyGifModule { }
