import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StickerComponent } from './sticker.component';
import { StickerRoutingModule } from './sticker-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@shared';
import { GirdModule } from 'src/app/utils/components/gird';
import { SearchInputModule } from 'src/app/utils/components/search-input/search-input.module';



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
    MatIconModule
  ]
})
export class StickerModule { }
