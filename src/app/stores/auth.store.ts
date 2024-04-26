import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { inject } from '@angular/core';
import { pipe, switchMap, tap } from 'rxjs';

import { LoginResponseInterface } from '@/interfaces/login-response.interface';
import { LoginBodyInterface } from '@/interfaces/login-body.interface';
import { AuthService } from '@/services/auth.service';
import { LocalStorageService } from '@/services/local-storage.service';
import { JwtService } from '@/services/jwt.service';
import { LocalStorageKeyEnum } from '@/enums/local-storage-key.enum';

interface AuthState {
  accessToken: string | null;
  username: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  username: null,
  loading: false,
  error: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withHooks((store) => {
    const localStorageService = inject(LocalStorageService);
    const jwtService = inject(JwtService);

    const accessToken = localStorageService.getItem(
      LocalStorageKeyEnum.accessToken,
    );
    let username: string | null = null;
    if (accessToken) {
      const jwtPayload = jwtService.decodeToken(accessToken);
      username = jwtPayload.sub ?? null;
    }

    return {
      onInit() {
        patchState(store, {
          accessToken,
          username,
        });
      },
    };
  }),
  withMethods(
    (
      store,
      authService = inject(AuthService),
      localStorageService = inject(LocalStorageService),
    ) => ({
      login: rxMethod<LoginBodyInterface>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((body: LoginBodyInterface) =>
            authService.login(body).pipe(
              tapResponse({
                next: (response: LoginResponseInterface) => {
                  const { token } = response;
                  localStorageService.setItem(
                    LocalStorageKeyEnum.accessToken,
                    token,
                  );
                  patchState(store, {
                    accessToken: token,
                    username: body.username,
                  });
                },
                error: (error: string) => patchState(store, { error }),
                finalize: () => patchState(store, { loading: false }),
              }),
            ),
          ),
        ),
      ),
    }),
  ),
);
