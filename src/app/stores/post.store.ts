import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { inject } from '@angular/core';
import { pipe, switchMap, tap } from 'rxjs';

import { PostResponseInterface } from '@/interfaces/post-response.interface';
import { PostService } from '@/services/post.service';
import { PageInterface } from '@/interfaces/page.interface';
import { PostInputInterface } from '@/components/post/post-input.interface';

interface PostState {
  postList: PostInputInterface[]
  loading: boolean
  error: string | null
}

const initialState: PostState = {
  postList: [],
  loading: false,
  error: null
}

export const PostStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, postService = inject(PostService)) => ({
    search: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap(() => postService.search()
          .pipe(
            tapResponse({
              next: (response: PageInterface<PostResponseInterface>) => patchState(store, { postList: response.content.map(post => ({
                id: post.id,
                createdAt: post.createdAt,
                content: post.content,
                username: post.username
              })), loading: false, error: null }),
              error: (error: string) => patchState(store, { loading: false, error })
            })
          )
        ),
      )
    ),
  }))
)