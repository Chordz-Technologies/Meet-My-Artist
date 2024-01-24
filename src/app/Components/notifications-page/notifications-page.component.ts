import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.css']
})
export class NotificationsPageComponent implements OnInit{

  eventdata:any[]=[]
  r_eventdata:any[]=[]
  constructor(private service:ServiceService){}
  ngOnInit(): void {
    this.service.getEventDetails().subscribe(res=>{
      this.r_eventdata=res.filter((item: { Erequirement: number; })=>item.Erequirement===0);
      console.log(res)
    })
    
  }

}
