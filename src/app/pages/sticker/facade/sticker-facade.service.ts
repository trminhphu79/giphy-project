import { Injectable } from "@angular/core";
import { HTTPParams } from "@utils/http";
import { StickerService, TrendingKeywordService, UserStorageService } from "@utils/services";
import { StickerStateService } from "../core/sticker-state.service";
import { Observable, take } from 'rxjs';
import { finalize } from 'rxjs';
import { TagsService } from "src/app/utils/services/tags.service";

@Injectable({ providedIn: "root" })
export class StickerFacadeService {

  constructor(
    private __stickerState: StickerStateService,
    private __stickerService: StickerService,
    private __trendingKeywordService: TrendingKeywordService,
    private __tagsService: TagsService,
    private __userStorage: UserStorageService
  ) { }

  getSticker() {
    return this.__stickerState.getSticker$()
  };

  isUpdating() {
    return this.__stickerState.isUpdating$();
  }

  getTrendingKeyword() {
    return this.__stickerState.getTrendingKeyword$();
  }

  getPagination() {
    return this.__stickerState.getPanigation$();
  }

  setFavorite(item: any, key: string) {
    this.__userStorage.saveData(key, item)
  }

  loadSticker(options: HTTPParams) {
    this.__stickerState.setUpdating(true);
    this.__stickerService.getTrending$(options).pipe(
      take(1),
      finalize(() => {
        this.__stickerState.setUpdating(false)
      })
    ).subscribe({
      next: (res) => {
        this.__stickerState.setSticker(res.data);
        this.__stickerState.setPagination(res.pagination);
      },
      error: (err) => {
        throw err
      }
    })
  }

  loadGifByTrendingKeyword(options?: HTTPParams) {
    this.__stickerState.setUpdating(true);
    this.__stickerService.searchByTrendingKeyword$(options).pipe(
      take(1),
      finalize(() => {
        this.__stickerState.setUpdating(false);
      })
    ).subscribe({
      next: (res) => {
        this.__stickerState.setSticker(res.data)
        this.__stickerState.setPagination(res.pagination);
      },
      error: (err) => {
        throw err
      }
    })
  }


  loadTrendingKeyword() {
    this.__trendingKeywordService.getTrendingKeyword().pipe(
      take(1),
      finalize(() => { })
    ).subscribe({
      next: (res) => {
        this.__stickerState.setTrendingKeywords(res.data);
      },
      error: (err) => {
        throw err
      }
    })
  }

  search(options: HTTPParams, clear: boolean = false, reload_tags: boolean = false) {
    return new Observable((obs) => {
      if (options?.q) {
        if (clear) {
          this.__stickerState.clearStickers()
        }
        if (reload_tags) {
          this.getRelatedTags(options.q);
        }
        this.loadGifByTrendingKeyword(options);
      } else {
        if (clear) {
          this.__stickerState.clearStickers()
        }
        this.loadSticker(options);
        this.loadTrendingKeyword();
      }
    })
  }

  getRelatedTags(term: string) {
    this.__tagsService.getTags(term).pipe(
      take(1),
    ).subscribe({
      next: (value) => {
        this.__stickerState.setTrendingKeywords(value.data.map((ite: any) => ite.name))
      },
      error: (err) => {
        throw err
      }
    })
  }

  clearState() {
    this.__stickerState.clearStickers();
    this.__stickerState.clearKeyword();
  }
}