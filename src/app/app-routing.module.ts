import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ProductsComponent } from './Components/products/products.component';
import { EventComponent } from './event/event.component';
import { ArtistHomePageComponent } from './artist-home-page/artist-home-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path:'products',component:ProductsComponent},
  { path: 'events',component:EventComponent},
  { path: 'artist_login',component:ArtistHomePageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
