import { Component, Input } from '@angular/core';

import { AvatarComponent } from '../avatar/avatar.component';
import { PostInputInterface } from './post-input.interface';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [AvatarComponent],
  templateUrl: './post.component.html',
})
export class PostComponent {
  @Input() post: PostInputInterface;

  timeSinceCreated: string;

  constructor() {
    this.post = {
      id: '',
      username: '',
      content: '',
      createdAt: new Date('1900-01-01 00:00:00'),
    };
    this.timeSinceCreated = '';
  }

  ngOnInit(): void {
    this.calculateTimeSinceCreated();
  }

  calculateTimeSinceCreated(): void {
    const now = new Date();
    const postDate = new Date(this.post.createdAt);
    const diffInSeconds = Math.floor(
      (now.getTime() - postDate.getTime()) / 1000,
    );

    if (diffInSeconds < 60) {
      this.timeSinceCreated = `${diffInSeconds}s`;
    } else if (diffInSeconds < 3600) {
      this.timeSinceCreated = `${Math.floor(diffInSeconds / 60)}m`;
    } else if (diffInSeconds < 86400) {
      this.timeSinceCreated = `${Math.floor(diffInSeconds / 3600)}h`;
    } else {
      this.timeSinceCreated = `${Math.floor(diffInSeconds / 86400)}d`;
    }
  }
}
