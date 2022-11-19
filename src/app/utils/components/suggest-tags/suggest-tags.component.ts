import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatChipListChange } from '@angular/material/chips';

@Component({
  selector: 'app-suggest-tags',
  templateUrl: './suggest-tags.component.html',
  styleUrls: ['./suggest-tags.component.scss']
})
export class SuggestTagsComponent implements OnInit {

  @Input() keywords!: string[];

  @Input() selectable: boolean = false;

  @Input() removable: boolean = false;

  @Output() eventChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void { }

  onChange(event: MatChipListChange) {
    this.eventChange.emit(event.value)
  }
}
