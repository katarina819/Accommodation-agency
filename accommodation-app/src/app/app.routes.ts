import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { MeetUsComponent } from './meet-us';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'meet-us', component: MeetUsComponent }
];