import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GIF } from '@utils/models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() item!: GIF;
  @Output() changes = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

}
