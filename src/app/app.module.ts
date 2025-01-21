import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderTopComponent } from './Components/header-top/header-top.component';
import { HeaderBottomComponent } from './Components/header-bottom/header-bottom.component';
import { FooterComponent } from './Components/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsPageComponent } from './Components/products-page/products-page.component';
import { EventsPageComponent } from './Components/events-page/events-page.component';
import { RegistrationFormComponent } from './Components/registration-form/registration-form.component';
import { ArtistsPageComponent } from './Components/artists-page/artists-page.component';
import { EventRegistrationComponent } from './Components/event-registration/event-registration.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './Components/login/login.component';
import { NotificationsPageComponent } from './Components/notifications-page/notifications-page.component';
import { WishlistPageComponent } from './Components/wishlist-page/wishlist-page.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTreeModule } from '@angular/material/tree';
import { ArtistProfilePageComponent } from './Components/artist-profile-page/artist-profile-page.component';
import { OrganizerPageComponent } from './Components/organizer-page/organizer-page.component';
import { OrganizerProfilePageComponent } from './Components/organizer-profile-page/organizer-profile-page.component';
import { LookingForThisComponent } from './Components/looking-for-this/looking-for-this.component';
import { EventManageComponent } from './Components/event-manage/event-manage.component';
import { ArtistsHomePageComponent } from './Components/artists-home-page/artists-home-page.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CarouselComponent } from './Components/carousel/carousel.component';
import { ArtistSubscriptionPageComponent } from './Components/artist-subscription-page/artist-subscription-page.component';
import { UserSubscriptionPageComponent } from './Components/user-subscription-page/user-subscription-page.component';
import { OrganizerSubscriptionPageComponent } from './Components/organizer-subscription-page/organizer-subscription-page.component';
import { PricingPageComponent } from './Components/pricing-page/pricing-page.component';
import { UpdateRegistrationFormComponent } from './Components/update-registration-form/update-registration-form.component';
import { SearchPageComponent } from './Components/search-page/search-page.component';
import { UserEventsComponent } from './Components/user-events/user-events.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { CareerPageComponent } from './Components/career-page/career-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderTopComponent,
    HeaderBottomComponent,
    FooterComponent,
    HomePageComponent,
    ProductsPageComponent,
    EventsPageComponent,
    RegistrationFormComponent,
    ArtistsPageComponent,
    EventRegistrationComponent,
    LoginComponent,
    NotificationsPageComponent,
    WishlistPageComponent,
    ArtistProfilePageComponent,
    OrganizerPageComponent,
    OrganizerProfilePageComponent,
    LookingForThisComponent,
    EventManageComponent,
    ArtistsHomePageComponent,
    CarouselComponent,
    ArtistSubscriptionPageComponent,
    UserSubscriptionPageComponent,
    OrganizerSubscriptionPageComponent,
    PricingPageComponent,
    UpdateRegistrationFormComponent,
    SearchPageComponent,
    UserEventsComponent,
    CareerPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    NgbCarouselModule,
    NgbDropdownModule,
    NgbCollapseModule,
    FormsModule,
    MatPaginatorModule,
    MatTreeModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatSelectModule,
    ToastrModule.forRoot()

  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
