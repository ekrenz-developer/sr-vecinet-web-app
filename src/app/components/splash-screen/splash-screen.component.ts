import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  templateUrl: './splash-screen.component.html',
  animations: [
    trigger('scaleAndFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(4)' }), // Comienza grande y transparente
        animate('500ms ease-out', style({ opacity: 1, transform: 'scale(1)' })), // Se achica y se hace visible
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'scale(1)' }), // Estado inicial normal
        animate('500ms ease-in', style({ opacity: 0, transform: 'scale(4)' })) // Se agranda y desvanece
      ]),
    ])
  ]
})
export class SplashScreenComponent {
}
