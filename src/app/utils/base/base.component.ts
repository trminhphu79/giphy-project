import { Component, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Component({ template: "" })
export class BaseComponent implements OnDestroy {
    destroy$ = new Subject<void>();
    params: { limit: number, offset: number } = {
        limit: 10,
        offset: 0
    }
    constructor() { }

    registerCoreLayer() { }

    clearState() { }

    trackByFn(index: number) {
        return index;
    };

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        this.clearState();
    }
}