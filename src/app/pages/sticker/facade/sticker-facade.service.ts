import { Injectable } from "@angular/core";
import { HTTPParams } from "@utils/http";
import { StickerService } from "src/app/utils/services/stickers.service";
import { StickerStateService } from "../core/sticker-state.service";
import { take } from 'rxjs';
import { finalize } from 'rxjs';

@Injectable({ providedIn: "root" })
export class StickerFacadeService {

  constructor(private __stickerState: StickerStateService, private __stickerService: StickerService) { }

  getSticker() {
    return this.__stickerState.getSticker$()
  };

  isUpdating() {
    return this.__stickerState.isUpdating$();
  }

  loadSticker(options?: HTTPParams) {
    this.__stickerState.setUpdating(true);
    this.__stickerService.getTrending$(options).pipe(
      take(1),
      finalize(() => {
        this.__stickerState.setUpdating(false)
      })
    ).subscribe({
      next: (res) => {
        this.__stickerState.setSticker(res.data);
      },
      error: (err) => {
        throw err
      }
    })
  }
}