import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/Services/service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist-profile-page',
  templateUrl: './artist-profile-page.component.html',
  styleUrls: ['./artist-profile-page.component.css']
})
export class ArtistProfilePageComponent implements OnInit {

  constructor(private service: ServiceService, private activatedRoute: ActivatedRoute) { }
  artist: any;
  public userId!: number;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val => {
      this.userId = val['uid'];
      this.service.getUserDetailsByID(this.userId)
        .subscribe({
          next: (res: any) => {
            this.artist = res.user_details; // Extracting the array of artists
          },
          error: (err: any) => {
            console.log(err);
          }
        })
    })
  }

  // getArtistList() {
  // this.service.getArtistDetailsByID(this.userId).subscribe({
  //   next: (res: any) => {
  //     console.log(res);
  //     this.artists = res.user_details;
  //     // this.updatePaginator();
  //   },
  //   error: (err: any) => {
  //     console.error('Error:', err);
  //     alert('Error fetching data. Check the console for details.');
  //   },
  // });
  // }
}
