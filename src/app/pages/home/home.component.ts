import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@utils/base';
import { takeUntil } from 'rxjs';
import { HomeFacadeService } from './facade/home-facade.service';
import { GIF } from '@utils/models';
import { Router } from '@angular/router';
import { LIMIT } from '@utils/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogDetailComponent } from '@utils/components/dialog/dialog-detail';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {

  gifList!: GIF[];
  gifUpdating!: boolean;
  stickerList!: GIF[];
  stickerUpdating!: boolean;

  sections: Section[] = [
    {
      type: "gif",
      dataSource: [],
      updating: false,
      leftIcon: 'trending_up',
      rightIcon: 'open_in_new',
      title: 'Gifs trending',
      showAll: () => {
        this.showAllGif()
      },
      viewDetail: (value) => {
        this.viewDetail(value)
      }
    },
    {
      type: 'sticker',
      dataSource: [],
      updating: false,
      leftIcon: 'auto_awsome',
      rightIcon: 'open_in_new',
      title: 'Stickers trending',
      showAll: () => {
        this.showAllSticker();
      },
      viewDetail: (value) => {
        this.viewDetail(value);
      }
    },
  ]

  constructor(
    private __homeFacade: HomeFacadeService,
    private __router: Router,
    private __dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.registerCoreLayer();
  }

  override registerCoreLayer(): void {
    this.__homeFacade.getGifList().pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        this.gifList = value;
        let idx = this.sections.findIndex((item) => item.type == 'gif');
        this.sections[idx].dataSource = value;
      }
    });

    this.__homeFacade.getStickerList().pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        this.stickerList = value;
        let idx = this.sections.findIndex((item) => item.type == 'sticker');
        this.sections[idx].dataSource = value;
      }
    });

    this.__homeFacade.isGifUpdating$().pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        this.gifUpdating = value;
        let idx = this.sections.findIndex((item) => item.type == 'gif');
        this.sections[idx].updating = value;
      }
    });

    this.__homeFacade.isStickerUpdating$().pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        this.stickerUpdating = value;
        let idx = this.sections.findIndex((item) => item.type == 'sticker');
        this.sections[idx].updating = value;
      }
    });

    this.__homeFacade.loadGifList({ limit: 8 });
    this.__homeFacade.loadStickeList({ limit: 8 });
  }

  favoriteChange(item: GIF) {
  }

  showAllSticker() {
    this.__router.navigate(['sticker']);
  }

  showAllGif() {
    this.__router.navigate(['gif']);
  }

  override ngOnDestroy(): void {
    this.destroy$.complete();
    this.__homeFacade.clearStates();
  }

  viewDetail(item: any) {
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
    confirmDialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(() => { });
  };
}

export interface Section {
  type: string,
  dataSource: GIF[],
  updating: boolean,
  leftIcon: string,
  rightIcon: string,
  title: string,
  showAll: () => void,
  viewDetail: (value: any) => void
}