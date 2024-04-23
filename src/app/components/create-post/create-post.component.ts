import { Component, EventEmitter, Input, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [AvatarComponent],
  templateUrl: './create-post.component.html',
  animations: [
    trigger('slideIn', [
      state('hidden', style({
        transform: 'translateY(100%)'
      })),
      state('shown', style({
        transform: 'translateY(0)'
      })),
      transition('hidden <=> shown', animate('150ms ease-in-out'))
    ])
  ]
})
export class CreatePostComponent {
  @Input() showCreatePost: boolean = false;
  @Output() togglePost = new EventEmitter<void>();
  @Output() toggleCancel = new EventEmitter<void>();

  handlePost(): void {
    this.togglePost.emit();
  }

  handleCancel(): void {
    this.toggleCancel.emit();
  }

  adjustTextArea(event: Event): void {
    const textArea = event.target as HTMLTextAreaElement; // Cast target to HTMLTextAreaElement
    textArea.style.height = 'auto'; // Reset the height to get the scrollHeight correctly
    textArea.style.height = `${textArea.scrollHeight}px`; // Set the height to the scrollHeight
  }
}
