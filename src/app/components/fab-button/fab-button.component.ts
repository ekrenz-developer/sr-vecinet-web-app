import { Component, EventEmitter, Input, Output } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-fab-button',
  standalone: true,
  imports: [],
  templateUrl: './fab-button.component.html',
  animations: [
    trigger('scaleIn', [
      transition(':enter', [
        style({
          transform: 'translate(-50%, -50%) scale(0)',
          opacity: 0,
        }),
        animate(
          '500ms ease-in-out',
          style({
            transform: 'translate(0, 0) scale(1)',
            opacity: 1,
          }),
        ),
      ]),
    ]),
  ],
})
export class FabButtonComponent {
  @Input() loading = true;
  @Output() toggleClick = new EventEmitter<void>();

  onClick() {
    this.toggleClick.emit();
  }
}
