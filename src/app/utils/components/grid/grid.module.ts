import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { GridComponent } from './grid.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@shared';
import { ContentLoaderModule } from '../content-loader';

@NgModule({
  declarations: [CardComponent, GridComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    SharedModule,
    ContentLoaderModule
  ],
  exports: [CardComponent, GridComponent]
})
export class GirdBaseModule { }
