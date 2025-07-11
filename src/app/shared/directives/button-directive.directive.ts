import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[primaryButton]',
})
export class PrimaryButton {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
    this.renderer.setStyle(this.el.nativeElement, 'color', 'blue');
  }
}
