import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@utils/base';
import { StickerFacadeService } from './facade/sticker-facade.service';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs';
import { GIF } from '@utils/models';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { HTTPParams, Pagination, TypeData } from '@utils/http';
import { LIMIT } from '@utils/http';

@Component({
  selector: 'app-sticker',
  templateUrl: './sticker.component.html',
  styleUrls: ['./sticker.component.scss']
})
export class StickerComponent extends BaseComponent implements OnInit {

  dataSource!: GIF[];
  updating!: boolean;
  form!: FormGroup;
  trendingKeyword!: string[];
  pagination!: Pagination;
  reloadTags: boolean = false;
  constructor(private __stickerFacade: StickerFacadeService, private _fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.#initForm();
    this.registerCoreLayer();
    this.registerValueChange();
  }

  override registerCoreLayer(): void {
    this.__stickerFacade.getSticker().pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        this.dataSource = value;
      },
      error: (err) => {
        throw err
      }
    });
    this.__stickerFacade.isUpdating().pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        this.updating = value;
      },
      error: (err) => {
        throw err
      }
    });

    this.__stickerFacade.getTrendingKeyword().pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        this.trendingKeyword = value;
        this.reloadTags = false;
        console.log(this.trendingKeyword)

      },
      error: (err) => {
        throw err
      }
    });

    this.__stickerFacade.getPagination().pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        this.pagination = value;
        console.log('...value', value)
      },
      error: (err) => {
        throw err
      }
    })


    this.__stickerFacade.loadSticker({ limit: this.pagination.count, offset: this.pagination.offset });
    this.__stickerFacade.loadTrendingKeyword();
  }

  #initForm() {
    this.form = this._fb.group({
      searchControl: [null]
    });
  }

  registerValueChange() {
    this.searchControl?.valueChanges.pipe(
      distinctUntilChanged((prev: string, current: string) => {
        if (prev.trim() === current.trim()) {
          return true
        }
        return false
      }),
      debounceTime(300),
      switchMap((term: string) => {
        this.dataSource = [];
        this.trendingKeyword = [];
        let params: HTTPParams = {
          q: term.trim(),
          limit: this.pagination.count,
        };
        this.reloadTags = true;
        return this.__stickerFacade.search(params, true, this.reloadTags)
      })
    ).subscribe({
      next: (value) => {
        console.log('success....')
      },
      error: (err) => {
        throw err
      }
    })
  }

  get searchControl(): AbstractControl {
    return this.form.controls['searchControl']
  };

  suggestTagChange(term: string) {
    this.form.patchValue({ searchControl: term });
  }

  onScrollingFinished() {
    console.log('onScrollingFinished...', event);
    this.__stickerFacade.search({ offset: this.pagination.count + this.pagination.offset, limit: LIMIT, q: this.searchControl.value }, false, this.reloadTags).subscribe({})
  }

  override clearState(){
    this.__stickerFacade.clearState();
  };
}
