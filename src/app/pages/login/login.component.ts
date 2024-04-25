import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  effect,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthStore } from '@/stores/auth.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements AfterViewInit {
  authStore = inject(AuthStore);
  router = inject(Router);

  username = '';
  @ViewChild('input')
  input!: ElementRef<HTMLInputElement>;

  constructor() {
    effect(() => {
      if (this.authStore.accessToken()) {
        this.router.navigate(['/home']);
      } else if (this.authStore.error()) {
        console.log('ERROR');
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.input.nativeElement.focus(), 0);
  }

  handleLogin(): void {
    this.authStore.login({ username: this.username });
  }

  get isThereUsername() {
    return this.username.trim().length > 0;
  }
}
