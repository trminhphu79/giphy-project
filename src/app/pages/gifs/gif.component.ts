import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { BaseComponent } from '@utils/base';
import { GIF } from '@utils/models';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs';
import { GifFacadeService } from './facade/gif-facade.service';
import { finalize } from 'rxjs';
import { HTTPParams, LIMIT, Pagination } from '@utils/http';
import { DialogDetailComponent } from '@utils/components/dialog/dialog-detail';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gif',
  templateUrl: './gif.component.html',
  styleUrls: ['./gif.component.scss']
})
export class GifComponent extends BaseComponent implements OnInit {

  dataSource!: GIF[];
  trendingKeyword!: string[]
  updating!: boolean;
  pagination!: Pagination;
  form!: FormGroup;
  reloadTags: boolean = false;
  constructor(
    private __gifFacade: GifFacadeService,
    private _fb: FormBuilder,
    private __dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.#initForm();
    this.registerCoreLayer();
    this.registerValueChange();
  }

  override registerCoreLayer(): void {

    this.__gifFacade.isUpdating$().pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        this.updating = value;
      },
      error: (err) => {
        throw err
      }
    });

    this.__gifFacade.getGifList().pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        this.dataSource = value;
      },
      error: (err) => {
        throw err
      }
    });

    this.__gifFacade.getTrendingKeyword().pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        this.trendingKeyword = value;
        this.reloadTags = false;
      },
      error: (err) => {
        throw err
      }
    });


    this.__gifFacade.getPagination().pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        this.pagination = value;
      },
      error: (err) => {
        throw err
      }
    })

    this.__gifFacade.loadGifList({ limit: this.pagination.count, offset: this.pagination.offset });
    this.__gifFacade.loadTrendingKeyword();
  }

  #initForm() {
    this.form = this._fb.group({
      searchControl: [null]
    });
  }

  get searchControl(): AbstractControl {
    return this.form.controls['searchControl']
  };

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
          limit: LIMIT,
        };
        this.reloadTags = true;
        return this.__gifFacade.search(params, true, this.reloadTags)
      })
    ).subscribe({
      next: (value) => {
      },
      error: (err) => {
        throw err
      }
    })
  }


  addFavorite(item: GIF) {
  }

  onScrollingFinished() {
    this.__gifFacade.search({ offset: this.pagination.count + this.pagination.offset, limit: LIMIT, q: this.searchControl.value }, false, this.reloadTags).subscribe({})
  }

  suggestTagChange(term: string) {
    this.form.patchValue({ searchControl: term });
  };

  viewDetail(item: GIF) {
    const confirmDialogRef = this.__dialog.open(DialogDetailComponent, {
      minWidth: '650px',
      maxWidth: '650px',
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
    confirmDialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(() => {});
  };

  override clearState(){
    this.__gifFacade.clearState();
  };
}
