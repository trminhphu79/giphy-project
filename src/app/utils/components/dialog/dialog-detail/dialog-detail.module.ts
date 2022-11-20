import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogDetailComponent } from './dialog-detail.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    DialogDetailComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  exports: [
    DialogDetailComponent
  ]
})
export class DialogDetailModule { }
