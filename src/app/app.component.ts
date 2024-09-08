import { Component, ViewChild } from '@angular/core';
import {
  trigger,
  animate,
  style,
  group,
  animateChild,
  query,
  stagger,
  transition,
  state,
} from '@angular/animations';
import { AppService } from './services/app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  message = '';
  name = '';

  constructor(private appService: AppService) {}

  getState(outlet: any) {
    // Changing the activatedRouteData.state triggers the animation
    return outlet.activatedRouteData.state;
  }

}
