import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-fab-button',
  standalone: true,
  imports: [],
  templateUrl: './fab-button.component.html',
})
export class FabButtonComponent {
  @Output() toggleClick = new EventEmitter<void>();

  onClick() {
    this.toggleClick.emit();
  }
}
