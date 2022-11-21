import { Component, OnInit } from '@angular/core';
import { LOCAL_STORAGE_KEY } from '@utils/models';
import { takeUntil } from 'rxjs';
import { UserFacadeService } from './facade/user-facade.service';
import { BaseComponent } from '@utils/base';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends BaseComponent implements OnInit {

  updating!: boolean
  dataSource!: any[]
  constructor(private __userFacade: UserFacadeService) {
    super()
  }

  ngOnInit(): void {
    this.registerCoreLayer();
  }

  override registerCoreLayer(): void {
    this.__userFacade.getFavorites().pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        this.dataSource = value;
      },
      error: (err) => {
        throw err
      }
    });
    this.__userFacade.isUpdating$().pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        this.updating = value;
      },
      error: (err) => {
        throw err
      }
    });
    this.__userFacade.loadGifs()
  }
}
