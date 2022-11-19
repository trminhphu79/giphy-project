import { Injectable } from "@angular/core";
import { HTTPParams } from '@utils/http';
import { GifService } from "@utils/services";
import { finalize, take } from "rxjs";
import { TrendingKeywordService } from "@utils/services";
import { GifStateService } from "../core/gif-state.service";

@Injectable({ providedIn: 'root' })
export class GifFacadeService {

  constructor(
    private __gifState: GifStateService,
    private __gifService: GifService,
    private __trendingKeywordService: TrendingKeywordService
  ) { }


  isUpdating$() {
    return this.__gifState.isUpdating$();
  }

  getGifList() {
    return this.__gifState.getGifs$();
  };

  getTrendingKeyword(){
    return this.__gifState.getTrendingKeyword$();
  }

loadGifList(options?: HTTPParams) {
    this.__gifState.setUpdating(true);
    this.__gifService.getTrending$(options).pipe(
      take(1),
      finalize(() => {
        this.__gifState.setUpdating(false);
      })
    ).subscribe({
      next: (res) => {
        this.__gifState.setGifs(res.data)
      },
      error: (err) => {
        throw err
      }
    })
  };

  loadTrendingKeyword() {
    this.__trendingKeywordService.getTrendingKeyword().pipe(
      take(1),
      finalize(() => { })
    ).subscribe({
      next: (res) => {
        this.__gifState.setTrendingKeywords(res.data)
      },
      error: (err) => {
        throw err
      }
    })
  }

  loadGifByTrendingKeyword(options?:HTTPParams){
    this.__gifState.setUpdating(true);
    this.__gifService.searchByTrendingKeyword$(options).pipe(
      take(1),
      finalize(() => {
        this.__gifState.setUpdating(false);
      })
    ).subscribe({
      next: (res) => {
        this.__gifState.setGifs(res.data)
      },
      error: (err) => {
        throw err
      }
    })
  }
}