import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuggestTagsComponent } from './suggest-tags.component';
import { MatChipsModule } from '@angular/material/chips';



@NgModule({
  declarations: [SuggestTagsComponent],
  imports: [
    CommonModule,
    MatChipsModule
  ],
  exports: [SuggestTagsComponent]
})
export class SuggestTagsModule { }
