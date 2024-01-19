import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
        this.artists = res;
      },
      error: (err: any) => {
        alert(err);
      }
    });
  }

  getProductsList() {
    this.service.getProductDetails().subscribe({
      next: (res: any) => {
        this.products = res;
      },
      error: (err: any) => {
        alert(err);
      }
    });
  }
}