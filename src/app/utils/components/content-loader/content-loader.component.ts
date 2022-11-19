import { Component, Input, ViewEncapsulation, HostBinding, SimpleChanges } from '@angular/core';

@Component({
    selector: 'content-loader',
    templateUrl: './content-loader.component.html',
    styleUrls: ['./content-loader.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ContentLoaderComponent {

    @Input() countLoading: number = 10;

    itemsLoading: any[] = new Array(this.countLoading)

    ngOnChanges(changes: SimpleChanges) {
        this.itemsLoading = new Array(this.countLoading)
    }
}
