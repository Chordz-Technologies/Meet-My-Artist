import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { ProductsPageComponent } from './Components/products-page/products-page.component';
import { EventsPageComponent } from './Components/events-page/events-page.component';
import { ArtistsPageComponent } from './Components/artists-page/artists-page.component';
import { OrganizerRegistrationComponent } from './Components/organizer-registration/organizer-registration.component';
import { ArtistRegistrationComponent } from './Components/artist-registration/artist-registration.component';
import { UserRegistrationComponent } from './Components/user-registration/user-registration.component';
import { EventRegistrationComponent } from './Components/event-registration/event-registration.component';
import { LoginComponent } from './Components/login/login.component';
import { NotificationsPageComponent } from './Components/notifications-page/notifications-page.component';
import { WishlistPageComponent } from './Components/wishlist-page/wishlist-page.component';
import { ArtistProfilePageComponent } from './Components/artist-profile-page/artist-profile-page.component';
import { OrganizerPageComponent } from './Components/organizer-page/organizer-page.component';
import { OrganizerProfilePageComponent } from './Components/organizer-profile-page/organizer-profile-page.component';
import { EventManageComponent } from './Components/event-manage/event-manage.component';
import { ArtistsHomePageComponent } from './Components/artists-home-page/artists-home-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'artists', component: ArtistsPageComponent },
  { path: 'events', component: EventsPageComponent },
  { path: 'products', component: ProductsPageComponent },
  { path: 'organizerRegistration', component: OrganizerRegistrationComponent },
  { path: 'artistRegistration', component: ArtistRegistrationComponent },
  { path: 'userRegistration', component: UserRegistrationComponent },
  { path: 'eventRegistration', component: EventRegistrationComponent },
  { path: 'eventManage', component: EventManageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'notifications', component: NotificationsPageComponent },
  { path: 'wishlist', component: WishlistPageComponent },
  { path: 'artistProfile/:artistId', component: ArtistProfilePageComponent },
  { path: 'organizer', component: OrganizerPageComponent },
  { path: 'organizerProfile/:organizerId', component: OrganizerProfilePageComponent },
  { path: 'artistsHome', component: ArtistsHomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
