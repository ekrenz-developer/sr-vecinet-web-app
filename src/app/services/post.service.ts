import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PageInterface } from '@/interfaces/page.interface';
import { PostResponseInterface } from '@/interfaces/post-response.interface';
import { PostQueryParamsInterface } from '@/interfaces/post-query-params.interface';
import { PageMetadataInterface } from '@/interfaces/page-metadata.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {}

  search(): Observable<PageInterface<PostResponseInterface>> {
    // return this.http.get<PageInterface<PostResponseInterface>>('http://localhost:8080/api/ms-vecinet-post/posts/search');
    const mockPosts: PostResponseInterface[] = [
      {
        id: "1",
        createdAt: new Date('2024-04-19 14:20'),
        updatedAt: new Date('2024-04-19 15:25'),
        latitude: 34.0522,
        longitude: -118.2437,
        content: "Just saw the most amazing sunset!",
        username: "Alice"
      },
      {
        id: "2",
        createdAt: new Date('2024-04-19 09:47'),
        updatedAt: new Date('2024-04-19 10:00'),
        latitude: 40.7128,
        longitude: -74.0060,
        content: "Loving the hustle and bustle of the city.",
        username: "Bob"
      },
      {
        id: "3",
        createdAt: new Date('2024-04-20 20:15'),
        updatedAt: new Date('2024-04-20 20:45'),
        latitude: 51.5074,
        longitude: -0.1278,
        content: "It's a lovely evening in London!",
        username: "Charlie"
      },
      {
        id: "4",
        createdAt: new Date('2024-04-20 07:34'),
        updatedAt: new Date('2024-04-20 08:00'),
        latitude: 48.8566,
        longitude: 2.3522,
        content: "A fresh croissant and a sunny morning in Paris.",
        username: "Danielle"
      },
      {
        id: "5",
        createdAt: new Date('2024-04-21 12:20'),
        updatedAt: new Date('2024-04-21 12:50'),
        latitude: -33.8688,
        longitude: 151.2093,
        content: "Sydney Opera House looks stunning as always.",
        username: "Ethan"
      },
      {
        id: "6",
        createdAt: new Date('2024-04-20 18:00'),
        updatedAt: new Date('2024-04-20 18:30'),
        latitude: 35.6895,
        longitude: 139.6917,
        content: "Tokyo at night is a different world.",
        username: "Fiona"
      },
      {
        id: "7",
        createdAt: new Date('2024-04-19 22:10'),
        updatedAt: new Date('2024-04-19 22:40'),
        latitude: 55.7558,
        longitude: 37.6173,
        content: "Moscow's Red Square is breathtaking.",
        username: "George"
      },
      {
        id: "8",
        createdAt: new Date('2024-04-19 13:20'),
        updatedAt: new Date('2024-04-19 13:50'),
        latitude: 37.7749,
        longitude: -122.4194,
        content: "The fog over San Francisco is mystical.",
        username: "Hannah"
      },
      {
        id: "9",
        createdAt: new Date('2024-04-21 11:11'),
        updatedAt: new Date('2024-04-21 11:45'),
        latitude: 52.5200,
        longitude: 13.4050,
        content: "Berlin's history can be felt in its streets.",
        username: "Ian"
      },
      {
        id: "10",
        createdAt: new Date('2024-04-20 15:30'),
        updatedAt: new Date('2024-04-20 16:00'),
        latitude: 41.9028,
        longitude: 12.4964,
        content: "Rome's ancient ruins are a marvel.",
        username: "Julia"
      },
      {
        id: "11",
        createdAt: new Date('2024-04-21 16:20'),
        updatedAt: new Date('2024-04-21 16:50'),
        latitude: 31.2304,
        longitude: 121.4737,
        content: "Shanghai is the epitome of modern meets tradition.",
        username: "Kyle"
      },
      {
        id: "12",
        createdAt: new Date('2024-04-21 02:00'),
        updatedAt: new Date('2024-04-21 02:30'),
        latitude: 28.6139,
        longitude: 77.2090,
        content: "Delhi at night is as lively as ever.",
        username: "Laura"
      },
      {
        id: "13",
        createdAt: new Date('2024-04-21 05:55'),
        updatedAt: new Date('2024-04-21 06:25'),
        latitude: 19.0760,
        longitude: 72.8777,
        content: "Mumbai's monsoons make the city feel alive.",
        username: "Miguel"
      },
      {
        id: "14",
        createdAt: new Date('2024-04-20 10:23'),
        updatedAt: new Date('2024-04-20 11:00'),
        latitude: -34.6037,
        longitude: -58.3816,
        content: "Buenos Aires is vibrant and full of color.",
        username: "Nina"
      },
      {
        id: "15",
        createdAt: new Date('2024-04-21 17:30'),
        updatedAt: new Date('2024-04-21 18:00'),
        latitude: 43.7384,
        longitude: 7.4246,
        content: "Monaco's luxury is unmatched.",
        username: "Oliver"
      }
    ];

    const mockPageMetadata: PageMetadataInterface = {
      pageSize: 10,
      pageNumber: 1,
      totalElements: 2,
      hasPreviousPage: false,
      hasNextPage: false,
    };

    const mockPage: PageInterface<PostResponseInterface> = {
      content: mockPosts,
      metadada: mockPageMetadata
    };

    return of(mockPage);
  }
}
