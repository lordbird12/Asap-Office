import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tooltip-content',
  template: `<div class="tooltip-box">11111</div>`,
  styleUrls: ['./company-detail.component.scss']
})
export class TooltipContentComponent {
  @Input() content: string = '';
  isVisible: boolean = false;

  show() {
    this.isVisible = true;
    console.log(2);
  }

  hide() {
    this.isVisible = false;
    console.log(1);
  }
}
