import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { AuthStore } from '../stores/auth.store';
import { AuthService } from '@/services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AuthStore);
  const authService = inject(AuthService);
  const toastrService = inject(ToastrService);

  const accessToken = authStore.accessToken();
  const clonedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return next(clonedReq).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        authService.logout('Your session was expired');
      } else {
        toastrService.error(
          '<span class="custom-toast-icon">x</span> Oops, something went wrong.',
          undefined,
          {
            timeOut: 3000,
            enableHtml: true,
            toastClass: 'ngx-toastr custom-toast',
          },
        );
      }

      // Re-throw the error to propagate it further
      return throwError(() => err);
    }),
  );
};
