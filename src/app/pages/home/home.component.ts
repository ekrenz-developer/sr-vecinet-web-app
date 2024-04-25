import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';

import { HeaderComponent } from '@/components/header/header.component';
import { PostComponent } from '@/components/post/post.component';
import { FabButtonComponent } from '@/components/fab-button/fab-button.component';
import { CreatePostComponent } from '@/components/create-post/create-post.component';
import { LoaderComponent } from '@/components/loader/loader.component';
import { PostSkeletonComponent } from '@/components/post-skeleton/post-skeleton.component';
import { PostStore } from '@/stores/post.store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    PostComponent,
    FabButtonComponent,
    CreatePostComponent,
    LoaderComponent,
    PostSkeletonComponent,
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  postStore = inject(PostStore);

  showCreatePost: boolean = false;

  ngOnInit(): void {
    this.postStore.search();
  }

  toggleCreatePost() {
    this.showCreatePost = true;
  }

  toggleCancelPost() {
    this.showCreatePost = false;
  }

  togglePost() {
    this.showCreatePost = false;
  }
}
