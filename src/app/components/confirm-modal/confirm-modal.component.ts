import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirm-modal.component.html',
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          transform: 'translateY(0%)',
        }),
      ),
      state(
        'out',
        style({
          transform: 'translateY(100%)',
        }),
      ),
      transition('in <=> out', animate('200ms ease-in-out')),
    ]),
  ],
})
export class ConfirmModalComponent {
  @Input() showModal: boolean = false;
  @Output() toggleDelete = new EventEmitter<void>();
  @Output() toggleCancel = new EventEmitter<void>();

  deletePost() {
    this.toggleDelete.emit();
  }

  cancel() {
    this.toggleCancel.emit();
  }
}
