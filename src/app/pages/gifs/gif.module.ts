import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GirdModule } from 'src/app/utils/components/gird';
import { GifRoutingModule } from './gif-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchInputModule } from 'src/app/utils/components/search-input/search-input.module';
import { MatIconModule } from '@angular/material/icon';
import { GifComponent } from './gif.component';



@NgModule({
  declarations: [
    GifComponent
  ],
  imports: [
    CommonModule,
    GirdModule,
    SearchInputModule,
    ReactiveFormsModule,
    MatIconModule,
    GifRoutingModule
  ]
})
export class GifModule { }
