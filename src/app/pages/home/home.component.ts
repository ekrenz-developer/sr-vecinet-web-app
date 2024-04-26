import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { HeaderComponent } from '@/components/header/header.component';
import { PostComponent } from '@/components/post/post.component';
import { FabButtonComponent } from '@/components/fab-button/fab-button.component';
import { CreatePostComponent } from '@/components/create-post/create-post.component';
import { LoaderComponent } from '@/components/loader/loader.component';
import { PostSkeletonComponent } from '@/components/post-skeleton/post-skeleton.component';
import { PostStore } from '@/stores/post.store';
import { SearchPostQueryParamsInterface } from '@/interfaces/search-post-query-params.interface';
import { CreatePostBodyInterface } from '@/interfaces/create-post-body.interface';
import { AuthStore } from '@/stores/auth.store';

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
  authStore = inject(AuthStore);
  router = inject(Router);
  toastrService = inject(ToastrService);

  showCreatePost: boolean = false;

  ngOnInit(): void {
    const queryParams: SearchPostQueryParamsInterface = {
      latitude: -34.6037389,
      longitude: -58.3815704,
    };
    this.postStore.search(queryParams);
  }

  toggleCreatePost() {
    if (!this.authStore.username()) {
      this.toastrService.info('Your session has expired', undefined, {
        timeOut: 3000,
        enableHtml: true,
        toastClass: 'ngx-toastr custom-toast',
      });
      this.router.navigate(['/']);
      return;
    }
    this.showCreatePost = true;
  }

  toggleCancelPost() {
    this.showCreatePost = false;
  }

  togglePost(content: string) {
    const body: CreatePostBodyInterface = {
      latitude: -34.6037389,
      longitude: -58.3815704,
      content,
      username: this.authStore.username() ?? '',
    };
    this.postStore.create(body);
    this.toastrService.info(
      '<span class="custom-toast-icon">✓</span> Your post was sent',
      undefined,
      {
        timeOut: 3000,
        enableHtml: true,
        toastClass: 'ngx-toastr custom-toast',
      },
    );
    this.showCreatePost = false;
  }
}
