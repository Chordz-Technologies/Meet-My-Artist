import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-artists-home-page',
  templateUrl: './artists-home-page.component.html',
  styleUrls: ['./artists-home-page.component.css']
})
export class ArtistsHomePageComponent implements OnInit {
  eventdata: any[] = []
  r_eventdata: any[] = []
  constructor(private event_data: ServiceService) { }
  ngOnInit(): void {
    this.event_data.getEventDetails().subscribe(res => {
      this.eventdata = res.filter((item: { Erequirement: number; }) => item.Erequirement === 1);
      this.r_eventdata = res.filter((item: { Erequirement: number; }) => item.Erequirement === 0);
      console.log(res)
    })

  }

}