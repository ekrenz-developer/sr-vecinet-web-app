import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { inject } from '@angular/core';
import { pipe, switchMap, tap } from 'rxjs';

import { GeolocationService } from '@/services/geolocation.service';
import { tapResponse } from '@ngrx/operators';
import { GeolocationResponseInterface } from '@/interfaces/geolocation-response.interface';

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
  withMethods((store, geolocationService = inject(GeolocationService)) => ({
    getCurrentPosition: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap(() =>
          geolocationService.getCurrentPosition().pipe(
            tapResponse({
              next: (response: GeolocationResponseInterface) =>
                patchState(store, {
                  latitude: response.lat,
                  longitude: response.lon,
                }),
              error: (error: string) => patchState(store, { error }),
              finalize: () => patchState(store, { loading: false }),
            }),
          ),
        ),
      ),
    ),
    //   getCurrentPosition: rxMethod<void>(
    //     pipe(
    //       tap(() => patchState(store, { loading: true, error: null })),
    //       switchMap(() =>
    //         permissionService.checkGeolocationPermission().pipe(
    //           switchMap((permissionStatus) => {
    //             if (
    //               permissionStatus.state === 'granted' ||
    //               permissionStatus.state === 'prompt'
    //             ) {
    //               return geolocationService.getCurrentPosition().pipe(
    //                 tap((position) => {
    //                   patchState(store, {
    //                     // latitude: position.coords.latitude,
    //                     // longitude: position.coords.longitude,
    //                     latitude: position.lat,
    //                     longitude: position.lon,
    //                   });
    //                 }),
    //                 catchError((error) => {
    //                   patchState(store, { error: error.message });
    //                   throw error; // Rethrow to propagate error down the Rx chain
    //                 }),
    //               );
    //             } else {
    //               const error = 'Location permission denied';
    //               patchState(store, { error });
    //               throw new Error(error);
    //             }
    //           }),
    //           catchError((error) => {
    //             patchState(store, { error: error.message });
    //             throw error;
    //           }),
    //         ),
    //       ),
    //       // catchError((error) => {
    //       //   // Log or handle additional errors here if necessary
    //       //   return []; // Return an observable or use EMPTY
    //       // }),
    //       tap({
    //         finalize: () => patchState(store, { loading: false }),
    //       }),
    //     ),
    //   ),
  })),
);
