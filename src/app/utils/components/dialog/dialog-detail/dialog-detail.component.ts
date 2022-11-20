import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogDetailData } from './models/dialog-detail.config';

@Component({
  selector: 'app-dialog-detail',
  templateUrl: './dialog-detail.component.html',
  styleUrls: ['./dialog-detail.component.scss']
})
export class DialogDetailComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IDialogDetailData
  ) { }

  trackByFn(index: number) {
    return index;
  }

  toProfile(url: any) {
    window.open(url, '_blank')
  }
}
