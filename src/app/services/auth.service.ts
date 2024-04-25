import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { LoginResponseInterface } from '@/interfaces/login-response.interface';
import { LoginBodyInterface } from '@/interfaces/login-body.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = environment.vecinetServiceBaseUrl;

  constructor(private http: HttpClient) {}

  login(body: LoginBodyInterface): Observable<LoginResponseInterface> {
    return this.http.post<LoginResponseInterface>(
      `${this.baseUrl}/api/ms-vecinet-auth/authenticate`,
      body,
    );
  }
}
