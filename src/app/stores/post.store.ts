import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { inject } from '@angular/core';
import { pipe, switchMap, tap } from 'rxjs';

import { PostResponseInterface } from '@/interfaces/post-response.interface';
import { PostService } from '@/services/post.service';
import { PageInterface } from '@/interfaces/page.interface';
import { PostInputInterface } from '@/components/post/post-input.interface';
import { SearchPostQueryParamsInterface } from '@/interfaces/search-post-query-params.interface';
import { CreatePostBodyInterface } from '@/interfaces/create-post-body.interface';

interface PostState {
  postList: PostInputInterface[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  postList: [],
  loading: false,
  error: null,
};

export const PostStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, postService = inject(PostService)) => ({
    search: rxMethod<SearchPostQueryParamsInterface>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap((querParams: SearchPostQueryParamsInterface) =>
          postService.search(querParams).pipe(
            tapResponse({
              next: (response: PageInterface<PostResponseInterface>) =>
                patchState(store, {
                  postList: response.content.map((post) => ({
                    id: post.id,
                    createdAt: post.createdAt,
                    content: post.content,
                    username: post.username,
                  })),
                }),
              error: (error: string) => patchState(store, { error }),
              finalize: () => patchState(store, { loading: false }),
            }),
          ),
        ),
      ),
    ),
    create: rxMethod<CreatePostBodyInterface>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap((body: CreatePostBodyInterface) =>
          postService.create(body).pipe(
            tapResponse({
              next: (response: PostResponseInterface) =>
                patchState(store, (state) => ({
                  postList: [
                    ...state.postList,
                    {
                      id: response.id,
                      createdAt: response.createdAt,
                      content: response.content,
                      username: response.username,
                    },
                  ],
                })),
              error: (error: string) => patchState(store, { error }),
              finalize: () => patchState(store, { loading: false }),
            }),
          ),
        ),
      ),
    ),
  })),
);
