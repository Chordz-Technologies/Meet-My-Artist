import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  
  eventdata:any[]=[]
  constructor(private event_data:ServiceService){}
  ngOnInit(): void {
    this.event_data.eventdata().subscribe(res=>{
      this.eventdata=res.filter((item: { Erequirement: number; })=>item.Erequirement===1);
      console.log(res)
    })
    
  }
}
