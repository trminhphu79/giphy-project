import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StickerComponent } from './sticker.component';
import { StickerRoutingModule } from './sticker-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@shared';
import { GirdBaseModule } from '@utils/components/grid';
import { SearchInputModule } from '@utils/components/search-input';
import { SuggestTagsModule } from '@utils/components/suggest-tags';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { MatDialogModule } from '@angular/material/dialog';
import { DialogDetailModule } from './../../utils/components/dialog/dialog-detail/dialog-detail.module';

@NgModule({
  declarations: [
    StickerComponent
  ],
  imports: [

    CommonModule,
    StickerRoutingModule,
    SharedModule,
    GirdBaseModule,
    SearchInputModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    SuggestTagsModule,
    InfiniteScrollModule,
    MatDialogModule,
    DialogDetailModule
  ]
})
export class StickerModule { }
