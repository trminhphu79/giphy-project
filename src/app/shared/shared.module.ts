import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RandomClassDirective } from "./directive/random-class.directive";

@NgModule({
    declarations: [
        RandomClassDirective,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        RandomClassDirective,
    ]
})
export class SharedModule { }