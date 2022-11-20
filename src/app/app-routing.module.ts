import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: "sticker",
    loadChildren: () => import('./pages/sticker/sticker.module').then((m) => m.StickerModule)
  },
  {
    path: "gif",
    loadChildren: () => import('./pages/gifs/gif.module').then((m) => m.GifModule)
  },
  {
    path: "upload",
    loadChildren: () => import('./pages/upload/upload.module').then((m) => m.UploadModule)
  },
  {
    path: "**",
    loadChildren: () => import('./pages/not-found/not-found.module').then((m) => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
