import { Injectable } from "@angular/core";
import { HTTPParams } from '@utils/http';
import { GifService } from "@utils/services";
import { finalize, Observable, take } from "rxjs";
import { TrendingKeywordService } from "@utils/services";
import { GifStateService } from "../core/gif-state.service";
import { TagsService } from "src/app/utils/services/tags.service";

@Injectable({ providedIn: 'root' })
export class GifFacadeService {

  constructor(
    private __gifState: GifStateService,
    private __gifService: GifService,
    private __trendingKeywordService: TrendingKeywordService,
    private __tagsService: TagsService
  ) { }

  isUpdating$() {
    return this.__gifState.isUpdating$();
  }

  getGifList() {
    return this.__gifState.getGifs$();
  };

  getTrendingKeyword() {
    return this.__gifState.getTrendingKeyword$();
  }

  getPagination() {
    return this.__gifState.getPanigation$();
  }

  loadGifList(options: HTTPParams) {
    this.__gifState.setUpdating(true);
    this.__gifService.getTrending$(options).pipe(
      take(1),
      finalize(() => {
        this.__gifState.setUpdating(false);
      })
    ).subscribe({
      next: (res) => {
        this.__gifState.setGifs(res.data);
        this.__gifState.setPagination(res.pagination);
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

  loadGifByTrendingKeyword(options: HTTPParams) {
    console.log('loadGifByTrendingKeyword...', options)
    this.__gifState.setUpdating(true);
    this.__gifService.searchByTrendingKeyword$(options).pipe(
      take(1),
      finalize(() => {
        this.__gifState.setUpdating(false);
      })
    ).subscribe({
      next: (res) => {
        this.__gifState.setGifs(res.data);
        this.__gifState.setPagination(res.pagination);
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
          this.__gifState.clearGif()
        }
        if (reload_tags) {
          this.getRelatedTags(options.q);
        }
        this.loadGifByTrendingKeyword(options);
      } else {
        if (clear) {
          this.__gifState.clearGif()
        }
        this.loadGifList(options);
        this.loadTrendingKeyword();
      }
    })
  }

  getRelatedTags(term: string) {
    this.__tagsService.getTags(term).pipe(
      take(1),
    ).subscribe({
      next: (value) => {
        console.log(value);
        this.__gifState.setTrendingKeywords(value.data.map((ite: any) => ite.name))
      },
      error: (err) => {
        throw err
      }
    })
  };

  clearState(){
    this.__gifState.clearGif();
    this.__gifState.clearKeyword();
  }
}