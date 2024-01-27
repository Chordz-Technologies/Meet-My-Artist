import { Component } from '@angular/core';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-artist-profile-page',
  templateUrl: './artist-profile-page.component.html',
  styleUrls: ['./artist-profile-page.component.css']
})
export class ArtistProfilePageComponent {

  constructor(private service: ServiceService){}
  artists: any[] = [];

  ngOnInit(): void {
    this.getArtistList();
  }

  getArtistList() {
    this.service.getArtistDetails().subscribe({
      next: (res: any) => {
        console.log(res);
        this.artists = res;
        // this.updatePaginator();
      },
      error: (err: any) => {
        console.error('Error:', err);
        alert('Error fetching data. Check the console for details.');
      },
    });
  }
}
