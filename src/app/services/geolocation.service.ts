import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GeolocationResponseInterface } from '@/interfaces/geolocation-response.interface';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  private readonly baseUrl = environment.geolocationServiceBaseUrl;
  private readonly apiKey = environment.geolocationServiceApiKey;

  constructor(private http: HttpClient) {}

  // Se decide no utilizar esta alternativa ya que la api siempre devuelve timeout
  // getCurrentPosition(): Observable<GeolocationPosition> {
  //   return new Observable((observer) => {
  //     if (navigator.geolocation) {
  //       const options: PositionOptions = {
  //         timeout: 60000,
  //         maximumAge: Infinity,
  //         enableHighAccuracy: false,
  //       };
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           observer.next(position);
  //           observer.complete();
  //         },
  //         (error) => {
  //           observer.error(error);
  //         },
  //         options,
  //       );
  //     } else {
  //       observer.error('Geolocation is not supported by this browser.');
  //     }
  //   });
  // }

  getCurrentPosition(): Observable<GeolocationResponseInterface> {
    return this.http.get<GeolocationResponseInterface>(`${this.baseUrl}`, {
      params: {
        apiKey: `${this.apiKey}`,
      },
    });
  }
}
