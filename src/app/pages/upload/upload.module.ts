import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';
import { UploadRoutingModule } from './upload-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSelectModule} from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    UploadComponent
  ],
  imports: [
  CommonModule,
    UploadRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    FlexLayoutModule,
    MatSelectModule,
    MatSnackBarModule
  ]
})
export class UploadModule { }
