import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

import { HeaderComponent } from '@/components/header/header.component';
import { FabButtonComponent } from '@/components/fab-button/fab-button.component';
import { LoaderComponent } from '@/components/loader/loader.component';
import { AuthService } from '@/services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { GeolocationService } from '@/services/geolocation.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FabButtonComponent, LoaderComponent, FormsModule],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router); 
  geoService = inject(GeolocationService);
  location: GeolocationPosition | null = null;

  username: string = '';


  ngOnInit(): void {
    this.geoService.getCurrentLocation()
      .then(position => {
        this.location = position;
        console.log('Got location', position);
      })
      .catch(error => {
        console.error('Error getting location', error);
      });
  }
  

  login() {
    console.log('LoginComponent login()');
    this.authService.authenticate(this.username).subscribe({
      next: (  ) => {
        console.log('Login successful');
        // route to home page
        this.router.navigate(['/home']);
      },
      error: () => {
        console.log('Login failed');
      }
    });
  }


}
