import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { OrganizerRegistrationComponent } from './Components/organizer-registration/organizer-registration.component';
import { ArtistRegistrationComponent } from './Components/artist-registration/artist-registration.component';
import { UserRegistrationComponent } from './Components/user-registration/user-registration.component';
import { ArtistsPageComponent } from './Components/artists-page/artists-page.component';
import { EventRegistrationComponent } from './Components/event-registration/event-registration.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './Components/login/login.component';
import { NotificationsPageComponent } from './Components/notifications-page/notifications-page.component';
import { WishlistPageComponent } from './Components/wishlist-page/wishlist-page.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTreeModule } from '@angular/material/tree';
import { ArtistProfilePageComponent } from './Components/artist-profile-page/artist-profile-page.component';
// import { FlatTreeControl } from '@angular/cdk/tree';


@NgModule({
  declarations: [
    AppComponent,
    HeaderTopComponent,
    HeaderBottomComponent,
    FooterComponent,
    HomePageComponent,
    ProductsPageComponent,
    EventsPageComponent,
    OrganizerRegistrationComponent,
    ArtistRegistrationComponent,
    UserRegistrationComponent,
    ArtistsPageComponent,
    EventRegistrationComponent,
    LoginComponent,
    NotificationsPageComponent,
    WishlistPageComponent,
    ArtistProfilePageComponent
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
    MatTreeModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
