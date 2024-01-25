import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ProductsComponent } from './Components/products/products.component';
import { EventComponent } from './event/event.component';
import { ArtistHomePageComponent } from './artist-home-page/artist-home-page.component';
import { NotificationComponent } from './notification/notification.component';
import { LoginComponent } from './login/login.component';
import { ArtistFormComponent } from './artist-form/artist-form.component';
import { OrganizerFormComponent } from './organizer-form/organizer-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { EventManageFormComponent } from './event-manage-form/event-manage-form.component';
import { CreateEventFormComponent } from './create-event-form/create-event-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path:'products',component:ProductsComponent},
  { path: 'events',component:EventComponent},
  { path: 'artist_login',component:ArtistHomePageComponent},
  { path: 'notifications', component:NotificationComponent},
  { path:'login', component:LoginComponent},
  { path: 'artist_form', component:ArtistFormComponent},
  { path: 'organizer_form', component:OrganizerFormComponent},
  { path: 'user_form', component:UserFormComponent},
  { path: 'event_manage',component:EventManageFormComponent},
  { path: 'create_event',component:CreateEventFormComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
