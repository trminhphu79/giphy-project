import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '@shared';
import { GirdBaseModule } from '@utils/components/grid';
import { SearchInputModule } from 'src/app/utils/components/search-input/search-input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SectionGridComponent } from './components/section-grid/section-grid.component';
import { DialogDetailModule } from '@utils/components/dialog/dialog-detail';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    HomeComponent,
    SectionGridComponent
  ],
  imports: [
CommonModule,
    HomeRoutingModule,
    SharedModule,
    GirdBaseModule,
    SearchInputModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    DialogDetailModule,
    MatDialogModule
  ]
})
export class HomeModule { }
