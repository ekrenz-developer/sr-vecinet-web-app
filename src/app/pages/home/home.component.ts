import { Component } from '@angular/core';

import { HeaderComponent } from '@/components/header/header.component';
import { PostFormComponent } from '@/components/post-form/post-form.component';
import { PostComponent } from '@/components/post/post.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, PostFormComponent, PostComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {

}
