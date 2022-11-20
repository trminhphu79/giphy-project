import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifRoutingModule } from './gif-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchInputModule } from 'src/app/utils/components/search-input/search-input.module';
import { MatIconModule } from '@angular/material/icon';
import { GifComponent } from './gif.component';
import { GirdBaseModule } from '@utils/components/grid';
import { SuggestTagsModule } from '@utils/components/suggest-tags';
import { DialogDetailModule } from '@utils/components/dialog/dialog-detail';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    GifComponent
  ],
  imports: [
    CommonModule,
    SearchInputModule,
    ReactiveFormsModule,
    MatIconModule,
    GifRoutingModule,
    GirdBaseModule,
    SuggestTagsModule,
    DialogDetailModule,
    MatDialogModule
  ]
})
export class GifModule { }
