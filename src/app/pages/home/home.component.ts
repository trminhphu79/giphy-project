import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@utils/base';
import { takeUntil } from 'rxjs';
import { HomeFacadeService } from './facade/home-facade.service';
import { GIF } from '@utils/models';
import { Router } from '@angular/router';
import { LIMIT } from '@utils/http';

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
  constructor(
    private __homeFacade: HomeFacadeService,
    private __router: Router
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
      }
    });

    this.__homeFacade.getStickerList().pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        this.stickerList = value;
      }
    });

    this.__homeFacade.isGifUpdating$().pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        this.gifUpdating = value;
      }
    });

    this.__homeFacade.isStickerUpdating$().pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        this.stickerUpdating = value;
      }
    });

    this.__homeFacade.loadGifList({ limit: 8 });
    this.__homeFacade.loadStickeList({ limit: 8 });
  }

  favoriteChange(item: GIF) {
    console.log(item)
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
}
