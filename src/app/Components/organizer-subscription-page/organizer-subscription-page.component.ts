import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-organizer-subscription-page',
  templateUrl: './organizer-subscription-page.component.html',
  styleUrls: ['./organizer-subscription-page.component.css']
})
export class OrganizerSubscriptionPageComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  userType: string = '';
  organizerSubscriptions: any[] = [];

  constructor(private service: ServiceService, private authService: AuthService) { }


  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isUserLoggedIn = loggedIn;
      if (loggedIn) {
        this.userType = this.authService.getUserType();
      } else {
        this.userType = ''; // Reset userType when user logs out
      }
    });

    this.organizerSubscriptionsData();
  }

  organizerSubscriptionsData() {
    this.service.getOrganizerSubscription().subscribe({
      next: (res: any) => {
        this.organizerSubscriptions = res.organizer_subscriptions;
      },
      error: (err: any) => {
        console.error('Error:', err);
        // alert('Error fetching data. Check the console for details.');
      },
    })
  }
}
