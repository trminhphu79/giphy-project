import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentLoaderComponent } from './content-loader.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [ContentLoaderComponent],
  imports: [CommonModule, NgxSkeletonLoaderModule],
  exports: [ContentLoaderComponent]
})
export class ContentLoaderModule { }
