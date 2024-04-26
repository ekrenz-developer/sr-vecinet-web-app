import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  effect,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  toastrService = inject(ToastrService);

  username = '';
  @ViewChild('input')
  input!: ElementRef<HTMLInputElement>;

  constructor() {
    effect(() => {
      if (this.authStore.accessToken()) {
        this.router.navigate(['/home']);
      } else if (this.authStore.error()) {
        this.toastrService.error(
          '<span class="custom-toast-icon">x</span> Oops, something went wrong.',
          undefined,
          {
            timeOut: 3000,
            enableHtml: true,
            toastClass: 'ngx-toastr custom-toast',
          },
        );
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
