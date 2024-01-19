import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  artists: any[] = [];

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.getArtistList();
  }

  getArtistList() {
    this.service.getArtistDetails().subscribe({
      next: (res: any) => {
        console.log(res);
        this.artists = res;
      },
      error: (err: any) => {
        alert(err);
      }
    });
  }
}
