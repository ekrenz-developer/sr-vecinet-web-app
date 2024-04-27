import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  constructor() {}

  getCurrentPosition(): Observable<GeolocationPosition> {
    return new Observable((observer) => {
      if (navigator.geolocation) {
        const options: PositionOptions = {
          timeout: 5000,
          maximumAge: 0,
          enableHighAccuracy: false,
        };
        navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next(position);
            observer.complete();
          },
          (error) => {
            observer.error(error);
          },
          options,
        );
      } else {
        observer.error('Geolocation is not supported by this browser.');
      }
    });
  }
}
