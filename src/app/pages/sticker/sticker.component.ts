import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@utils/base';
import { StickerFacadeService } from './facade/sticker-facade.service';
import { takeUntil } from 'rxjs';
import { GIF } from '@utils/models';

@Component({
  selector: 'app-sticker',
  templateUrl: './sticker.component.html',
  styleUrls: ['./sticker.component.scss']
})
export class StickerComponent extends BaseComponent implements OnInit {

  dataSource!: GIF[];
  updating!: boolean;
  constructor(private __stickerFacade: StickerFacadeService) {
    super();
    this.params.limit = 24;
  }

  ngOnInit(): void {
    this.registerCoreLayer();
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
    this.__stickerFacade.loadSticker({ limit: this.params.limit });
  }

}
