import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { inject } from '@angular/core';
import { catchError, pipe, switchMap, tap } from 'rxjs';

import { PermissionService } from '@/services/permission.service';
import { GeolocationService } from '@/services/geolocation.service';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: GeolocationState = {
  latitude: null,
  longitude: null,
  loading: false,
  error: null,
};

export const GeolocationStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (
      store,
      permissionService = inject(PermissionService),
      geolocationService = inject(GeolocationService),
    ) => ({
      getCurrentPosition: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loading: true, error: null })),
          switchMap(() =>
            permissionService.checkGeolocationPermission().pipe(
              switchMap((permissionStatus) => {
                if (
                  permissionStatus.state === 'granted' ||
                  permissionStatus.state === 'prompt'
                ) {
                  return geolocationService.getCurrentPosition().pipe(
                    tap((position) => {
                      console.log('Position obtained:', position);
                      patchState(store, {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                      });
                    }),
                    catchError((error) => {
                      console.error('Error obtaining position:', error);
                      patchState(store, { error: error.message });
                      throw error; // Rethrow to propagate error down the Rx chain
                    }),
                  );
                } else {
                  const error = 'Location permission denied';
                  patchState(store, { error });
                  throw new Error(error);
                }
              }),
              catchError((error) => {
                patchState(store, { error: error.message });
                throw error;
              }),
            ),
          ),
          // catchError((error) => {
          //   // Log or handle additional errors here if necessary
          //   return []; // Return an observable or use EMPTY
          // }),
          tap({
            finalize: () => patchState(store, { loading: false }),
          }),
        ),
      ),
    }),
  ),
);
