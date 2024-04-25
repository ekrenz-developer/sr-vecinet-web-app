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
  private readonly baseUrl = environment.vecinetServiceBaseUrl;
  private readonly accessToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnYWJpaWNhdGEiLCJpYXQiOjE3MTQwNDA1MzEsImV4cCI6MTcxNDA0NDEzMX0.5yGFp5qvYJZZN0r9V2sfVP96e88X1N3WNAogFvnqmMs';

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

  create(body: CreatePostBodyInterface): Observable<PostResponseInterface> {
    return this.http.post<PostResponseInterface>(
      `${this.baseUrl}/api/ms-vecinet-post/posts`,
      body,
      {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      },
    );
  }
}
