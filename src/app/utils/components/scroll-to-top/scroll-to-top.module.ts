import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollToTopComponent } from './scroll-to-top.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    ScrollToTopComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports:[ScrollToTopComponent]
})
export class ScrollToTopModule { }
