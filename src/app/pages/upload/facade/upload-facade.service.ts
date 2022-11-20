import { Injectable } from "@angular/core";
import { UploadService } from "src/app/utils/services/upload.service";
import { take } from 'rxjs';

@Injectable({ providedIn: "root" })
export class UploadFacade {
  constructor(private __uploadService: UploadService) {

  }

  uploadFiles(file: any) {
    this.__uploadService.uploadFile$(file).pipe(
      take(1),
    ).subscribe((res) => {
      console.log(res)
    })
  }
}