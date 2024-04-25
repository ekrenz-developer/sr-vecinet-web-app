import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { inject } from '@angular/core';
import { pipe, switchMap, tap } from 'rxjs';

import { AuthService } from '@/services/auth.service';
import { LoginResponseInterface } from '@/interfaces/login-response.interface';
import { LoginBodyInterface } from '@/interfaces/login-body.interface';

interface AuthState {
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  loading: false,
  error: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, authService = inject(AuthService)) => ({
    login: rxMethod<LoginBodyInterface>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap((body: LoginBodyInterface) =>
          authService.login(body).pipe(
            tapResponse({
              next: (response: LoginResponseInterface) =>
                patchState(store, {
                  accessToken: response.token,
                }),
              error: (error: string) => patchState(store, { error }),
              finalize: () => patchState(store, { loading: false }),
            }),
          ),
        ),
      ),
    ),
  })),
);
