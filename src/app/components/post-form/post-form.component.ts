import { Component } from '@angular/core';

import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [AvatarComponent],
  templateUrl: './post-form.component.html',
})
export class PostFormComponent {

}
