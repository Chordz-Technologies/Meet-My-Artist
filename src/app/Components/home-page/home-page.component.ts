import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  artists: any[] = [];
  products: any[] = [];

  constructor(private service: ServiceService) { }

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
        alert(err);
      }
    });
  }

  getProductsList() {
    this.service.getProductDetails().subscribe({
      next: (res: any) => {
        this.products = res.all_products.slice(0, 4);
      },
      error: (err: any) => {
        alert(err);
      }
    });
  }
}