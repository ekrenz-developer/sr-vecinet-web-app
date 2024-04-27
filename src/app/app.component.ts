import { Component, OnDestroy, OnInit, Renderer2, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SplashScreenComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  renderer = inject(Renderer2);

  title = 'vecinet';
  showSplash = true;

  constructor() {
    setTimeout(() => {
      this.showSplash = false;
    }, 2000);
  }

  ngOnInit() {
    this.renderer.addClass(document.body, 'overflow-y-hidden');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'overflow-y-hidden');
  }
}
