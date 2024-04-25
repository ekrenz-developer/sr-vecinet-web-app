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
import { SearchPostQueryParamsInterface } from '@/interfaces/search-post-query-params.interface';

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
    const queryParams: SearchPostQueryParamsInterface = {
      latitude: -34.6037389,
      longitude: -58.3815704,
    };
    this.postStore.search(queryParams);
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
