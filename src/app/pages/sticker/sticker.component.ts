import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@utils/base';
import { StickerFacadeService } from './facade/sticker-facade.service';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs';
import { GIF, LOCAL_STORAGE_KEY } from '@utils/models';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { HTTPParams, Pagination, TypeData } from '@utils/http';
import { LIMIT } from '@utils/http';
import { DialogDetailComponent } from '@utils/components/dialog/dialog-detail';
import { MatDialog } from '@angular/material/dialog';
import { UserStorageService } from '@utils/services';

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
  constructor(
    private __stickerFacade: StickerFacadeService,
    private _fb: FormBuilder,
    private __dialog: MatDialog,
    private __userService: UserStorageService
  ) {
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
      },
      error: (err) => {
        throw err
      }
    });

    this.__stickerFacade.getPagination().pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        this.pagination = value;
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
    this.__stickerFacade.search({ offset: this.pagination.count + this.pagination.offset, limit: LIMIT, q: this.searchControl.value }, false, this.reloadTags).subscribe({})
  }

  viewDetail(item: GIF) {
    const confirmDialogRef = this.__dialog.open(DialogDetailComponent, {
      minWidth: '650px',
      maxWidth: '80%',
      disableClose: true,
      data: {
        title: `Information Detail`,
        content: item,
        actions: [
          {
            text: 'Cancel',
            backgroundColor: 'default',
            action: () => {
              confirmDialogRef.close()
            }
          },
    
        ]
      }
    });
    confirmDialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(() => { });
  };

  override clearState() {
    this.__stickerFacade.clearState();
  };
}
