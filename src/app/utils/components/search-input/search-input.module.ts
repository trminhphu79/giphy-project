import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from './search-input.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    SearchInputComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports:[SearchInputComponent]
})
export class SearchInputModule { }
