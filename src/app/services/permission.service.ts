import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor() {}

  checkGeolocationPermission(): Observable<PermissionStatus> {
    if (navigator && navigator.permissions) {
      return from(navigator.permissions.query({ name: 'geolocation' }));
    } else {
      throw new Error('Permissions API not supported');
    }
  }
}
