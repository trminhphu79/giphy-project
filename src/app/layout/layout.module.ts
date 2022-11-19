import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavComponent } from './top-nav/top-nav.component';
import { FooterComponent } from './footer/footer.component';
import { SearchInputModule } from '../utils/components/search-input/search-input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    TopNavComponent,
    FooterComponent
  ],
  imports: [
  CommonModule,
    SearchInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule
  ],
  exports: [
    TopNavComponent,
    FooterComponent,
  ]
})
export class LayoutModule { }
