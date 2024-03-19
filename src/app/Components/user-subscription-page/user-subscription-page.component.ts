import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-user-subscription-page',
  templateUrl: './user-subscription-page.component.html',
  styleUrls: ['./user-subscription-page.component.css']
})
export class UserSubscriptionPageComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  userType: string = '';
  userSubscriptions: any[] = [];

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

    this.userSubscriptionsData();
  }

  userSubscriptionsData() {
    this.service.getUserSubscription().subscribe({
      next: (res: any) => {
        this.userSubscriptions = res.user_subscriptions;
      },
      error: (err: any) => {
        console.error('Error:', err);
        // alert('Error fetching data. Check the console for details.');
      },
    })
  }
}
