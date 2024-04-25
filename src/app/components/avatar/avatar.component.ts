import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [],
  templateUrl: './avatar.component.html',
})
export class AvatarComponent {
  @Input() username: string = '';

  get initial(): string {
    return this.username.charAt(0).toUpperCase();
  }
}
