import { Component } from '@angular/core';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.css']
})
export class WishlistPageComponent {
  artists: any[] = [];
  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.getArtistList();
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
}
