import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StickerComponent } from './sticker.component';
import { StickerRoutingModule } from './sticker-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@shared';
import { GirdModule } from '@utils/components/grid';
import { SearchInputModule } from '@utils/components/search-input';
import { SuggestTagsModule } from '@utils/components/suggest-tags';



@NgModule({
  declarations: [
    StickerComponent
  ],
  imports: [
    CommonModule,
    StickerRoutingModule,
    SharedModule,
    GirdModule,
    SearchInputModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    SuggestTagsModule
  ]
})
export class StickerModule { }
