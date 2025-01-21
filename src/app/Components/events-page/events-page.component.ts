import { Component } from '@angular/core';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.css'],
})
export class EventsPageComponent {
  eventdata: any[] = [];
  url = 'https://api.meetmyartist.in/';
  defaultImageUrl: string = './assets/event-poster.jpeg';

  constructor(private service: ServiceService) {}
  ngOnInit(): void {
    this.service.getEventDetails().subscribe({
      next: (res: any) => {
        this.eventdata = res.all_events
          .filter((item: { erequirements: number }) => item.erequirements === 1)
          .map((event: any) => ({
            ...event,
            edate: new Date(event.edate), // Convert to Date object for proper formatting
          }));
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getWhatsAppLink(event: any): string {
    const message = `Hello, I am interested to attend event of ${event.ename} organized by ${event.obusinessname}.`;
    return `https://api.whatsapp.com/send?phone=917517311326&text=${encodeURIComponent(
      message
    )}`;
  }
}
