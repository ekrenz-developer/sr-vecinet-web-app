import { Component, OnInit } from '@angular/core';

import { HeaderComponent } from '@/components/header/header.component';
import { PostFormComponent } from '@/components/post-form/post-form.component';
import { PostComponent } from '@/components/post/post.component';
import { PostService } from '@/services/post.service';
import { PostInputInterface } from '@/components/post/post-input.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, PostFormComponent, PostComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  postList: PostInputInterface[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.search().subscribe({
      next: (page) => {
        this.postList = page.content.map(post => ({
          id: post.id,
          createdAt: post.createdAt,
          content: post.content,
          username: post.username
        }));
      },
      error: (error) => {
        console.error('Failed to load posts:', error);
      }
    });
  }
}
