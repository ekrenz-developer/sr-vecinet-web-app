import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { environment } from '@env/environment';
import { LoginResponseInterface } from '@/interfaces/login-response.interface';
import { LoginBodyInterface } from '@/interfaces/login-body.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = environment.vecinetAuthServiceBaseUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastrService: ToastrService,
  ) {}

  login(body: LoginBodyInterface): Observable<LoginResponseInterface> {
    return this.http.post<LoginResponseInterface>(
      `${this.baseUrl}/api/ms-vecinet-auth/authenticate`,
      body,
    );
  }

  logout(toastMessage?: string): void {
    if (toastMessage && toastMessage.length > 0) {
      this.toastrService.info(toastMessage, undefined, {
        timeOut: 3000,
        enableHtml: true,
        toastClass: 'ngx-toastr custom-toast',
      });
    }
    this.router.navigate(['/']);
  }
}
