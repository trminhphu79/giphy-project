import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuggestTagsComponent } from './suggest-tags.component';
import { MatChipList, MatChipsModule } from '@angular/material/chips'; 
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [SuggestTagsComponent],
  imports: [
    CommonModule,
    MatChipsModule,
    MatButtonModule,
  ],
  exports: [SuggestTagsComponent]
})
export class SuggestTagsModule { }
