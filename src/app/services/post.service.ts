import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PageInterface } from '@/interfaces/page.interface';
import { PostResponseInterface } from '@/interfaces/post-response.interface';
import { PostQueryParamsInterface } from '@/interfaces/post-query-params.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {}

  search(payload: PostQueryParamsInterface): Observable<PageInterface<PostResponseInterface>> {
    return this.http.get<PageInterface<PostResponseInterface>>('http://localhost:8080/api/ms-vecinet-post/posts/search');
  }
}
