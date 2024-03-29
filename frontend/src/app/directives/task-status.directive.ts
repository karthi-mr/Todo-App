import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTaskStatus]',
  standalone: true,
})
export class TaskStatusDirective implements OnInit {
  @Input({ required: true }) completedStatus!: boolean;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
    if (this.completedStatus) {
      this.renderer.setStyle(
        this.el.nativeElement,
        'background-color',
        'green'
      );
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', 'red');
    }
  }
}
