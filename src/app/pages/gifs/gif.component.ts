import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseComponent } from '@utils/base';
import { GIF } from '@utils/models';
import { takeUntil } from 'rxjs';
import { GifFacadeService } from './facade/gif-facade.service';

@Component({
  selector: 'app-gif',
  templateUrl: './gif.component.html',
  styleUrls: ['./gif.component.scss']
})
export class GifComponent extends BaseComponent implements OnInit {


  dataSource!: GIF[];
  updating!: boolean;
  offset: number = 0;
  form!: FormGroup;
  limit: number = 32;

  constructor(private __gifFacade: GifFacadeService, private _fb: FormBuilder) {
    super()
  }

  ngOnInit(): void {
    this.registerCoreLayer();
    this.#initForm();
  }

  override registerCoreLayer(): void {

    this.__gifFacade.isUpdating$().pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        console.log('value...', value)
        this.updating = value;
      },
      error: (err) => {
        throw err
      }
    });

    this.__gifFacade.getGifList().pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        this.dataSource = value
      },
      error: (err) => {
        throw err
      }
    })
    
    this.__gifFacade.loadGifList({ limit: this.limit });
  }

  #initForm() {
    this.form = this._fb.group({
      searchControl: [null]
    })
  }

  favoriteChange(item: GIF) {
    console.log(item)
  }

  onScrollingFinished() {
    this.__gifFacade.loadGifList({ offset: this.offset, limit: this.limit })
  }

}
