import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { FormsModule } from '@angular/forms';

import { AvatarComponent } from '../avatar/avatar.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [AvatarComponent, FormsModule, ConfirmModalComponent],
  templateUrl: './create-post.component.html',
  animations: [
    trigger('slideIn', [
      state(
        'hidden',
        style({
          transform: 'translateY(100%)',
        }),
      ),
      state(
        'shown',
        style({
          transform: 'translateY(0)',
        }),
      ),
      transition('hidden <=> shown', animate('150ms ease-in-out')),
    ]),
  ],
})
export class CreatePostComponent {
  @Input() showCreatePost: boolean = false;
  @Output() togglePost = new EventEmitter<string>();
  @Output() toggleCancel = new EventEmitter<void>();
  @ViewChild('textarea')
  textarea!: ElementRef<HTMLTextAreaElement>;

  content = '';
  showConfirmModal: boolean = false;

  handlePost(): void {
    this.togglePost.emit(this.content);
  }

  handleCancel(): void {
    if (this.content.trim().length > 0) {
      this.showConfirmModal = true;
    } else {
      this.toggleCancel.emit();
    }
  }

  adjustTextArea(event: Event): void {
    const textArea = event.target as HTMLTextAreaElement; // Cast target to HTMLTextAreaElement
    textArea.style.height = 'auto'; // Reset the height to get the scrollHeight correctly
    textArea.style.height = `${textArea.scrollHeight}px`; // Set the height to the scrollHeight
  }

  onAnimationDone() {
    if (this.showCreatePost) {
      this.textarea.nativeElement.focus();
    }
  }

  get isThereContent() {
    return this.content.trim().length > 0;
  }

  toggleConfirmModalCancel() {
    this.showConfirmModal = false;
  }

  toggleConfirmModalDelete() {
    this.showConfirmModal = false;
    this.content = '';
    this.toggleCancel.emit();
  }
}
