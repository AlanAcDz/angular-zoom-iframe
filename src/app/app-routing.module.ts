import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MeetingComponent } from './meeting/meeting.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'zoom', loadChildren: () => import('./zoom/zoom.module').then(m => m.ZoomModule) },
  { path: ':meeting', component: MeetingComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
