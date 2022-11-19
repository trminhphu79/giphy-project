import { Injectable } from "@angular/core";
import { HTTPParams } from '@utils/http';
import { GifService } from "@utils/services";
import { finalize, take } from "rxjs";
import { StickerService } from "@utils/services";
import { HomeStateSerivce } from "../core/home-state.service";

@Injectable({ providedIn: 'root' })
export class HomeFacadeService {

  constructor(
    private __homeState: HomeStateSerivce,
    private __gifService: GifService,
    private __stickerService: StickerService
  ) { }


  isGifUpdating$() {
    return this.__homeState.isGifUpdating$();
  }

  isStickerUpdating$() {
    return this.__homeState.isStickerUpdating$()
  }

  loadGifList(options?: HTTPParams) {
    this.__homeState.setGifUpdating(true);
    this.__gifService.getTrending$(options).pipe(
      take(1),
      finalize(() => {
        this.__homeState.setGifUpdating(false);
      })
    ).subscribe({
      next: (res) => {
        this.__homeState.setGifs(res.data)
      },
      error: (err) => {
        throw err
      }
    })
  };

  loadStickeList(options?: HTTPParams) {
    this.__homeState.setStickerUpdating(true);
    this.__stickerService.getTrending$(options).pipe(
      take(1),
      finalize(() => {
        this.__homeState.setStickerUpdating(false)
      })
    ).subscribe({
      next: (res) => {
        this.__homeState.setStickers(res.data)
      },
      error: (err) => {
        throw err
      }
    })
  }

  getGifList() {
    return this.__homeState.getGifs$();
  };

  getStickerList() {
    return this.__homeState.getSticker$();
  }

  clearStates() {
    this.__homeState.clearGifs();
    this.__homeState.clearStickers();
  }
}