import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('http://localhost:8080/api/ms-vecinet-post/posts');
  }

  createPost(): Observable<Post[]> {
    return this.http.get<Post[]>('http://localhost:8080/api/ms-vecinet-post/posts');
  }
}
