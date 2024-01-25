import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit{
  eventdata:any[]=[]
  r_eventdata:any[]=[]
  constructor(private event_data:ServiceService){}
  ngOnInit(): void {
    this.event_data.eventdata().subscribe(res=>{
      this.r_eventdata=res.filter((item: { Erequirement: number; })=>item.Erequirement===0);
      console.log(res)
    })
    
  }

}

