import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { MeetUsComponent } from './meet-us';
import { WorkComponent } from './work';
import { RequestComponent } from './request';
import { RelocationComponent } from './relocation';
import { TimeComponent } from './time';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'meet-us', component: MeetUsComponent },
  { path: 'work', component: WorkComponent },
  { path: 'request', component: RequestComponent },
  { path: 'request/relocation', component: RelocationComponent },
  { path: 'request/time', component: TimeComponent }
];