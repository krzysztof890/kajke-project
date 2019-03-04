import { Directive, Input, ElementRef, AfterContentChecked, AfterContentInit } from '@angular/core';

@Directive({
  selector: '[appAutoResizeTextArea]'
})
export class AutoResizeTextAreaDirective implements AfterContentChecked {
  @Input()
  charactersPerLine: number;

  constructor(private el: ElementRef) {
    this.el.nativeElement.rows = 1;
  }

  // @HostListener('input')
  // onInput() {
  //   this.el.nativeElement.rows = Math.floor(this.el.nativeElement.value.length / this.charactersPerLine) + 1;
  // }

  ngAfterContentChecked(): void {
    this.el.nativeElement.rows = Math.floor(this.el.nativeElement.value.length / this.charactersPerLine) + 1;
  }
}
