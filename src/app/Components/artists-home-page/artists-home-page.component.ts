import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-artists-home-page',
  templateUrl: './artists-home-page.component.html',
  styleUrls: ['./artists-home-page.component.css']
})
export class ArtistsHomePageComponent implements OnInit {
  eventdata: any[] = [];
  r_eventdata: any[] = [];
  url = 'https://meetmyartist.beatsacademy.in/';
  defaultImageUrl: string = './assets/event-poster.jpeg';


  constructor(private event_data: ServiceService) { }
  ngOnInit(): void {
    this.event_data.getEventDetails().subscribe(res => {
      this.eventdata = res.all_events.filter((item: { erequirements: number; }) => item.erequirements === 1);
      this.r_eventdata = res.all_events.filter((item: { erequirements: number; }) => item.erequirements === 0);
    })
  }
}