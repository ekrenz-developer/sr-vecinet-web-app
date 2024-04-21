import { Component } from '@angular/core';

import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [AvatarComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {

}
