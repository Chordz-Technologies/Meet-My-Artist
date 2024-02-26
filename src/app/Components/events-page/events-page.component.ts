import { Component } from '@angular/core';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.css']
})
export class EventsPageComponent {
  eventdata: any[] = [];

  constructor(private service: ServiceService) { }
  ngOnInit(): void {
    this.service.getEventDetails().subscribe({
      next: (res: any) => {
        this.eventdata = res.all_events.filter((item: { erequirements: number; }) => item.erequirements === 1);
      },
      error: (err: any) => {
        alert(err);
      }
    });
  }
}
