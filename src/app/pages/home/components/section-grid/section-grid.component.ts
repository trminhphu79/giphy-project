import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GIF } from '@utils/models';

@Component({
  selector: 'app-section-grid',
  templateUrl: './section-grid.component.html',
  styleUrls: ['./section-grid.component.scss']
})
export class SectionGridComponent implements OnInit {

  @Input() dataSource: GIF[] = [];

  @Input() updating: boolean = false;

  @Input() title: string = '';

  @Input() rightIcon: string = ''

  @Input() leftIcon: string = ''


  @Output() showAll = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }
}
