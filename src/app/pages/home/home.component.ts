import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  effect,
  inject,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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
import { GeolocationStore } from '@/stores/geolocation.store';
import { AuthService } from '@/services/auth.service';
import { PermissionService } from '@/services/permission.service';

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
  geolocationStore = inject(GeolocationStore);
  toastrService = inject(ToastrService);
  authService = inject(AuthService);
  permissionService = inject(PermissionService);

  showCreatePost: boolean = false;

  constructor() {
    effect(
      () => {
        if (
          this.geolocationStore.latitude() &&
          this.geolocationStore.longitude()
        ) {
          this.searchPosts();
        }
      },
      { allowSignalWrites: true },
    );
  }

  ngOnInit(): void {
    this.geolocationStore.getCurrentPosition();
  }

  toggleCreatePost() {
    if (!this.authStore.username()) {
      this.authService.logout('Your session was expired');
      return;
    }
    this.showCreatePost = true;
  }

  toggleCancelPost() {
    this.showCreatePost = false;
  }

  togglePost(content: string) {
    const body: CreatePostBodyInterface = {
      latitude: this.geolocationStore.latitude() ?? 0,
      longitude: this.geolocationStore.longitude() ?? 0,
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

  onScroll(event: Event) {
    const target = event.target as HTMLElement;
    const scrollTop = target.scrollTop;
    if (scrollTop === 0 && !this.postStore.loading()) {
      this.searchPosts();
    }
  }

  searchPosts() {
    const queryParams: SearchPostQueryParamsInterface = {
      latitude: this.geolocationStore.latitude() ?? 0,
      longitude: this.geolocationStore.longitude() ?? 0,
    };
    this.postStore.search(queryParams);
  }
}
