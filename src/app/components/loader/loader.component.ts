import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          height: '*',
          opacity: 1,
          visibility: 'visible',
        }),
      ),
      state(
        'out',
        style({
          height: '0px',
          opacity: 0,
          visibility: 'hidden',
          padding: '0',
        }),
      ),
      transition('in => out', [animate('300ms ease-in')]),
      transition('out => in', [animate('300ms ease-out')]),
    ]),
  ],
})
export class LoaderComponent {
  @Input() show: boolean = false;
}
