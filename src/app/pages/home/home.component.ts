import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@utils/base';
import { takeUntil } from 'rxjs';
import { HomeFacadeService } from './facade/home-facade.service';
import { GIF } from '@utils/models';
import { Router } from '@angular/router';

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
  offset: number = 0;
  limit: number = 4;
  constructor(
    private __homeFacade: HomeFacadeService,
    private __router: Router
  ) {
    super()
  }

  ngOnInit(): void {
    this.registerCoreLayer();
  }

  override registerCoreLayer(): void {
    this.__homeFacade.getGifList().pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        console.log('value...', value)
        this.gifList = value;
      }
    });

    this.__homeFacade.getStickerList().pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        console.log('value...', value)
        this.stickerList = value;
      }
    });

    this.__homeFacade.isGifUpdating$().pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        console.log('value...', value)
        this.gifUpdating = value;
      }
    });

    this.__homeFacade.isStickerUpdating$().pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        console.log('value...', value)
        this.stickerUpdating = value;
      }
    });

    this.__homeFacade.loadGifList({ limit: this.limit });
    this.__homeFacade.loadStickeList({ limit: this.limit });
  }

  favoriteChange(item: GIF) {
    console.log(item)
  }

  onScrollingFinished() {
    this.__homeFacade.loadGifList({ offset: this.offset, limit: this.limit })
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
