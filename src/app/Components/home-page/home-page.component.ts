import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  artists: any[] = [];
  products: any[] = [];
  url = 'https://api.meetmyartist.in/';
  userType = localStorage.getItem('userType');

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getArtistList();
    this.getProductsList();
  }

  getArtistList() {
    this.service.getArtistDetails().subscribe({
      next: (res: any) => {
        this.artists = res.artists_list.slice(0, 3);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  getProductsList() {
    this.service.getProductDetails().subscribe({
      next: (res: any) => {
        this.products = res.all_products.slice(0, 4);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
}