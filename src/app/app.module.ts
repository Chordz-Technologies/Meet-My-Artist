import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { HomeComponent } from './Components/home/home.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsComponent } from './Components/products/products.component';
import { HttpClientModule} from '@angular/common/http';
import { TextlengthPipe } from './products-textlength/textlength.pipe';
import { EventComponent } from './event/event.component';
import { ArtistHomePageComponent } from './artist-home-page/artist-home-page.component';
import { NotificationComponent } from './notification/notification.component';
import { LoginComponent } from './login/login.component';
import { ArtistFormComponent } from './artist-form/artist-form.component';
import { OrganizerFormComponent } from './organizer-form/organizer-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { EventManageFormComponent } from './event-manage-form/event-manage-form.component';
import { CreateEventFormComponent } from './create-event-form/create-event-form.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderTopComponent,
    HeaderBottomComponent,
    FooterComponent,
    HomeComponent,
    ProductsComponent,
    TextlengthPipe,
    EventComponent,
    ArtistHomePageComponent,
    NotificationComponent,
    LoginComponent,
    ArtistFormComponent,
    OrganizerFormComponent,
    UserFormComponent,
    EventManageFormComponent,
    CreateEventFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
