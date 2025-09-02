import { Component, signal } from '@angular/core';
import { HomeComponent } from './home/home';

@Component({
  selector: 'app-root',
  standalone: true,      // potrebno za standalone komponentu
  imports: [HomeComponent],
  template: `<app-home></app-home>`,
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('accommodation-app');
}
