import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
    imports: [
        CommonModule,
        A11yModule,
        MatDialogModule,
        MatIconModule,
        MatButtonModule,
        FlexLayoutModule
    ],
    declarations: [ConfirmDialogComponent],
    exports: [ConfirmDialogComponent]
})
export class ConfirmDialogModule { }
