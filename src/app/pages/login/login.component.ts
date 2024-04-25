import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

import { HeaderComponent } from '@/components/header/header.component';
import { FabButtonComponent } from '@/components/fab-button/fab-button.component';
import { LoaderComponent } from '@/components/loader/loader.component';
import { AuthService } from '@/services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 


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

  username: string = '';


  ngOnInit(): void {
    console.log('LoginComponent initialized');
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
