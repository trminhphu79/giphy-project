import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { GridComponent } from './grid.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@shared';
import { ContentLoaderModule } from '../content-loader';
import { ImageLoaderModule } from '../image-loader';
import { InfiniteScrollModule } from "ngx-infinite-scroll";

@NgModule({
  declarations: [CardComponent, GridComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    SharedModule,
    ContentLoaderModule,
    ImageLoaderModule,
    InfiniteScrollModule
  ],
  exports: [CardComponent, GridComponent]
})
export class GirdBaseModule { }
