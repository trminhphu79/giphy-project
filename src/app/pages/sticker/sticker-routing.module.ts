import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StickerComponent } from './sticker.component';

const routes: Routes = [
  {
    path: '',
    component: StickerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StickerRoutingModule { }
