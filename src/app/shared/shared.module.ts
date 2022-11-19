import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RandomClassDirective } from "./directive/random-class.directive";
import { ScrollLoadMoreDirective } from "./directive/scroll-load-more.directive";

@NgModule({
    declarations: [
        RandomClassDirective,
        ScrollLoadMoreDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        RandomClassDirective,
        ScrollLoadMoreDirective
    ]
})
export class SharedModule { }