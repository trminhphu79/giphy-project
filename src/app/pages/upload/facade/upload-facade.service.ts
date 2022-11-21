import { Injectable } from "@angular/core";
import { forkJoin, Observable } from 'rxjs';
import { MyGifService } from "src/app/utils/services/my-gif.service";

@Injectable({ providedIn: "root" })
export class UploadFacade {
  constructor(
    private __myGifService: MyGifService,
  ) { }

  uploadFile(file: File, path: string) {
    return this.__myGifService.uploadFile$(file, path)
  }

  createGif$(value: GifInfor) {
    let request$: Array<Observable<any>> = [];
    let files = value.files;
    files.forEach((url, index) => {
      request$.push(this.__myGifService.createGifs$({
        file: url,
        title: value.title + " " + index,
        tags: value.title,
        username: value.username,
        trending_datetime: new Date()
      }))
    });

    return forkJoin(request$)
  }
}

export interface GifInfor {
  title: string,
  username: string,
  tags: string,
  files: string[]
}