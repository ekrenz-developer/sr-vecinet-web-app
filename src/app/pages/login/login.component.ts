import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';

  handleLogin(): void {
    console.log('login');
  }

  get isThereUsername() {
    return this.username.trim().length > 0;
  }
}
