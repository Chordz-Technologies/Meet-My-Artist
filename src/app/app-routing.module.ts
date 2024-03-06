import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { ProductsPageComponent } from './Components/products-page/products-page.component';
import { EventsPageComponent } from './Components/events-page/events-page.component';
import { ArtistsPageComponent } from './Components/artists-page/artists-page.component';
import { RegistrationFormComponent } from './Components/registration-form/registration-form.component';
import { EventRegistrationComponent } from './Components/event-registration/event-registration.component';
import { LoginComponent } from './Components/login/login.component';
import { NotificationsPageComponent } from './Components/notifications-page/notifications-page.component';
import { WishlistPageComponent } from './Components/wishlist-page/wishlist-page.component';
import { ArtistProfilePageComponent } from './Components/artist-profile-page/artist-profile-page.component';
import { OrganizerPageComponent } from './Components/organizer-page/organizer-page.component';
import { OrganizerProfilePageComponent } from './Components/organizer-profile-page/organizer-profile-page.component';
import { EventManageComponent } from './Components/event-manage/event-manage.component';
import { ArtistsHomePageComponent } from './Components/artists-home-page/artists-home-page.component';
import { authGuard } from './Services/auth.guard';
import { ArtistSubscriptionPageComponent } from './Components/artist-subscription-page/artist-subscription-page.component';
import { UserSubscriptionPageComponent } from './Components/user-subscription-page/user-subscription-page.component';
import { OrganizerSubscriptionPageComponent } from './Components/organizer-subscription-page/organizer-subscription-page.component';
import { PricingPageComponent } from './Components/pricing-page/pricing-page.component';
import { UpdateRegistrationFormComponent } from './Components/update-registration-form/update-registration-form.component';
import { SearchPageComponent } from './Components/search-page/search-page.component';
import { UserEventsComponent } from './Components/user-events/user-events.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: [authGuard] },
  // { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'artists', component: ArtistsPageComponent },
  { path: 'events', component: EventsPageComponent },
  { path: 'products', component: ProductsPageComponent },
  { path: 'registrationForm', component: RegistrationFormComponent },
  { path: 'updateRegistrationForm/:uid', component: UpdateRegistrationFormComponent },
  { path: 'eventRegistration', component: EventRegistrationComponent },
  { path: 'eventManage/:eid', component: EventManageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'notifications', component: NotificationsPageComponent },
  { path: 'wishlist/:uid', component: WishlistPageComponent },
  { path: 'artistProfile/:uid', component: ArtistProfilePageComponent },
  { path: 'organizer', component: OrganizerPageComponent },
  { path: 'organizerProfile/:uid', component: OrganizerProfilePageComponent },
  { path: 'artistsHome', component: ArtistsHomePageComponent, canActivate: [authGuard] },
  { path: 'userSubscription', component: UserSubscriptionPageComponent },
  { path: 'artistSubscription', component: ArtistSubscriptionPageComponent },
  { path: 'organizerSubscription', component: OrganizerSubscriptionPageComponent },
  { path: 'pricing', component: PricingPageComponent },
  { path: 'search/:term', component: SearchPageComponent },
  { path: 'userEvents/:uid', component: UserEventsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
