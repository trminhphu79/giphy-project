import { Component, OnInit } from '@angular/core';
import { MyGifFacadeService } from './facade/my-gif-facade.service';
import { BaseComponent } from './../../utils/base/base.component';
import { takeUntil } from 'rxjs';
import { DialogDetailComponent } from '@utils/components/dialog/dialog-detail';
import { MatDialog } from '@angular/material/dialog';
import { UserStorageService } from '@utils/services';
import { LOCAL_STORAGE_KEY } from '@utils/models';

@Component({
  selector: 'app-my-gif',
  templateUrl: './my-gif.component.html',
  styleUrls: ['./my-gif.component.scss']
})
export class MyGifComponent extends BaseComponent implements OnInit {

  updating!: boolean
  dataSource!: any[]
  constructor(
    private __gifFacade: MyGifFacadeService,
    private __dialog: MatDialog,
    private __userService: UserStorageService
  ) {
    super()
  }

  ngOnInit(): void {
    this.registerCoreLayer();
  }

  override registerCoreLayer() {
    this.__gifFacade.getGif().pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        this.dataSource = value.map((item) => {
          item.images = {
            downsized: {
              url: item.file
            }
          }
          return item
        });
      },
      error: (err) => {
        throw err
      }
    });
    this.__gifFacade.isUpdating().pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        this.updating = value;
      },
      error: (err) => {
        throw err
      }
    });
    this.__gifFacade.loadMyGif();
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
