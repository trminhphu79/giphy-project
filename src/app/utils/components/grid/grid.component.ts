import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-grid[items]',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class GridComponent extends BaseComponent implements OnInit {

  @Input() items!: any[];
  
  @Input() updating!: boolean;

  @Input() countLoadMore:number = 8;

  @Output() favoriteChange = new EventEmitter();

  @Output() viewDetail = new EventEmitter();

  @Output() scrollingFinished = new EventEmitter();
  
  constructor() { 
    super()
  }

  ngOnInit(): void {}

  onScrolled(){
    this.scrollingFinished.emit();
  }
}
