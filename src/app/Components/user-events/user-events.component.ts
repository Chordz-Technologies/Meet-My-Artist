import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/Services/service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.css']
})
export class UserEventsComponent {
  eventdata: any[] = [];
  r_eventdata: any[] = []
  userID!: number;
  url='https://meetmyartist.beatsacademy.in/'
  defaultImageUrl: string = './assets/event-poster.jpeg';

  constructor(private service: ServiceService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.route.params.subscribe(val => {
      this.userID = val['uid']; // Assuming the parameter name is 'id'
      // Fetch the product details using the ID and populate the form
      this.service.getEventIdByUserId(this.userID).subscribe({
        next: (res: any) => { // Adjust the type annotation here
          // console.log('Response:', res); // Debug statement to check response data
          if (typeof res === 'object' && res !== null && 'event_data' in res && Array.isArray(res.event_data)) {
            this.eventdata = res.event_data.filter((item: any) => item.erequirements === 1);
            this.r_eventdata = res.event_data.filter((item: any) => item.erequirements === null || item.erequirements === 0);
            // console.log('EventData:', this.eventdata); // Debug statement to check eventdata
            // console.log('Reversed EventData:', this.r_eventdata); // Debug statement to check r_eventdata
          } else {
            console.error('Invalid response structure:', res); // Log an error if response structure is invalid
          }
        }, 
        error: (err) => {
          console.log('Error:', err); // Debug statement to check for errors
        }
      });
    });

  }

  isEventDatePassed(eventDate: string): boolean {
    const currentDate = new Date();
    const parsedEventDate = new Date(eventDate);
    return parsedEventDate < currentDate;
  }

  edit(eid: number) {
    this.router.navigate(['/eventManage', eid]);
  }
}
