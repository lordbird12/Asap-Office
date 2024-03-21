// custom-tooltip.directive.ts
import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCustomTooltip]'
})
export class CustomTooltipDirective {
  @Input() appCustomTooltip: string = '';
  private tooltipElement: HTMLElement | null = null;
  private arrowElement: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltipElement) {
      this.createTooltip();
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.removeTooltip();
  }

  private createTooltip() {
    this.tooltipElement = this.renderer.createElement('div');
    this.renderer.appendChild(this.tooltipElement, this.renderer.createText("1321321312312"));
    this.renderer.addClass(this.tooltipElement, 'custom-tooltip');

    // Create the arrow element and append it to the tooltip
    this.arrowElement = this.renderer.createElement('div');
    this.renderer.addClass(this.arrowElement, 'tooltip-arrow');
    this.renderer.appendChild(this.tooltipElement, this.arrowElement);

    this.renderer.appendChild(document.body, this.tooltipElement);
    this.positionTooltip();
  }

  private positionTooltip() {
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltipElement.getBoundingClientRect();
    const arrowPos = this.arrowElement.getBoundingClientRect();
    const top = hostPos.top + (hostPos.height - tooltipPos.height) / 2 + 'px';
    const right = hostPos.right + tooltipPos.width - arrowPos.width + 'px';

    this.renderer.setStyle(this.tooltipElement, 'top', top);
    this.renderer.setStyle(this.tooltipElement, 'right', right);
  }

  private removeTooltip() {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
      this.arrowElement = null;
    }
  }
}