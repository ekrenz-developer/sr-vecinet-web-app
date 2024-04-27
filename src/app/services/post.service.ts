import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { PageInterface } from '@/interfaces/page.interface';
import { PostResponseInterface } from '@/interfaces/post-response.interface';
import { SearchPostQueryParamsInterface } from '@/interfaces/search-post-query-params.interface';
import { CreatePostBodyInterface } from '@/interfaces/create-post-body.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly baseUrl = environment.vecinetPostServiceBaseUrl;

  constructor(private http: HttpClient) {}

  search(
    queryParams: SearchPostQueryParamsInterface,
  ): Observable<PageInterface<PostResponseInterface>> {
    return this.http.get<PageInterface<PostResponseInterface>>(
      `${this.baseUrl}/api/ms-vecinet-post/posts/search`,
      {
        params: { ...queryParams },
      },
    );
  }

  create(body: CreatePostBodyInterface): Observable<PostResponseInterface> {
    return this.http.post<PostResponseInterface>(
      `${this.baseUrl}/api/ms-vecinet-post/posts`,
      body,
    );
  }
}
