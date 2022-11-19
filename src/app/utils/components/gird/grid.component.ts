import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent extends BaseComponent implements OnInit {

  @Input() items!: any[];
  
  @Input() updating!: boolean;

  @Input() countLoadMore:number = 8;

  @Output() favoriteChange = new EventEmitter();

  @Output() changes = new EventEmitter();

  @Output() scrollingFinished = new EventEmitter();
  
  constructor() { 
    super()
  }

  ngOnInit(): void {}

  onScrollingFinished() {
    this.scrollingFinished.emit();
  }
}
