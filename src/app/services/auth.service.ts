import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of } from 'rxjs';

import { PageInterface } from '@/interfaces/page.interface';
import { PostResponseInterface } from '@/interfaces/post-response.interface';
import { PageMetadataInterface } from '@/interfaces/page-metadata.interface';
import { LoginInterface } from '@/interfaces/login.interface';
import { LoginMetadataInterface } from '@/interfaces/login-metadata.interface';
import { LoginResponseInterface } from '@/interfaces/login.response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  authenticate( username : string ): Observable<LoginInterface<LoginResponseInterface>> {
    const mockLoginResponse: LoginResponseInterface = 
      {
        token : "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnYWJpaWNhdGEiLCJpYXQiOjE3MTQwMDkwMzgsImV4cCI6MTcxNDAxMjYzOH0.tj0YDDs46sdgGQycHcyp6FAeRYHxjmL1hTGxO34lCvE"
      }
    ;

    const mockLoginMetadata: LoginMetadataInterface = {
      username : "gabica",
    };

    const mockLogin: LoginInterface<LoginResponseInterface> = {
      content: mockLoginResponse,
      metadada: mockLoginMetadata
    };

    return of(mockLogin).pipe(
      delay(2000)
    );
  }
}
