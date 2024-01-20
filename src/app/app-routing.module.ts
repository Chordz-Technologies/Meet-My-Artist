import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ProductsComponent } from './Components/products/products.component';
import { EventsComponent } from './Components/events/events.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'events', component: EventsComponent },
  { path: 'products', component: ProductsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
