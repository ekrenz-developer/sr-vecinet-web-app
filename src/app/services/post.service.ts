import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PageInterface } from '@/interfaces/page.interface';
import { PostResponseInterface } from '@/interfaces/post-response.interface';
import { SearchPostQueryParamsInterface } from '@/interfaces/search-post-query-params.interface';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly baseUrl = environment.vecinetServiceBaseUrl;
  private readonly accessToken = '';

  constructor(private http: HttpClient) {}

  search(
    queryParams: SearchPostQueryParamsInterface,
  ): Observable<PageInterface<PostResponseInterface>> {
    return this.http.get<PageInterface<PostResponseInterface>>(
      `${this.baseUrl}/api/ms-vecinet-post/posts/search`,
      {
        headers: { Authorization: `Bearer ${this.accessToken}` },
        params: { ...queryParams },
      },
    );
  }
}
