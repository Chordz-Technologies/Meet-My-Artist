import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-artist-home-page',
  templateUrl: './artist-home-page.component.html',
  styleUrls: ['./artist-home-page.component.css']
})
export class ArtistHomePageComponent implements OnInit{
  eventdata:any[]=[]
  r_eventdata:any[]=[]
  constructor(private event_data:ServiceService){}
  ngOnInit(): void {
    this.event_data.eventdata().subscribe(res=>{
      this.eventdata=res.filter((item: { Erequirement: number; })=>item.Erequirement===1);
      this.r_eventdata=res.filter((item: { Erequirement: number; })=>item.Erequirement===0);
      console.log(res)
    })
    
  }

}
