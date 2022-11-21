import { Injectable } from "@angular/core";
import { HTTPParams } from "@utils/http";
import { StickerService, TrendingKeywordService } from "@utils/services";
import { Observable, take } from 'rxjs';
import { finalize } from 'rxjs';
import { MyGifService } from "src/app/utils/services/my-gif.service";
import { TagsService } from "src/app/utils/services/tags.service";
import { MyGifStateService } from "../core/my-gif-state.service";

@Injectable({ providedIn: "root" })
export class MyGifFacadeService {

  constructor(
    private __myGifState: MyGifStateService,
    private __myGifService: MyGifService,
  ) { }

  getGif() {
    return this.__myGifState.getGifs$()
  };

  isUpdating() {
    return this.__myGifState.isUpdating$()
  }

  loadMyGif() {
    this.__myGifState.setUpdating(true)
    this.__myGifService.getGifs$().pipe(
      take(1),
      finalize(() => {
        this.__myGifState.setUpdating(false)
      })
    )
      .subscribe({
        next: (value) => {
          this.__myGifState.setGifs(value);
        },
        error: (err) => {
          throw err
        }
      })
  }
}