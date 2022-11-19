import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: '[randomClass]'
})
export class RandomClassDirective {
  constructor(private __elementRef: ElementRef<HTMLElement>) {
    this.__elementRef.nativeElement.classList.add(this.getRandomClass())
  }

  private getRandomClass() {
    let number_random = Math.floor(Math.random() * 3)
    if (number_random == 1) {
      return 'card_small';
    } else if (number_random == 2) {
      return 'card_medium';
    } else {
      return 'card_large';
    }
  }
}