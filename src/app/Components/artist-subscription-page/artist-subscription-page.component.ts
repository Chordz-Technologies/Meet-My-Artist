import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-artist-subscription-page',
  templateUrl: './artist-subscription-page.component.html',
  styleUrls: ['./artist-subscription-page.component.css']
})
export class ArtistSubscriptionPageComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  userType: string = '';
  artistSubscriptions: any[] = [];

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
    this.artistSubscriptionsData();
  }

  artistSubscriptionsData() {
    this.service.getArtistSubscription().subscribe({
      next: (res: any) => {
        this.artistSubscriptions = res.artist_subscriptions;

      },
      error: (err: any) => {
        console.error('Error:', err);
        alert('Error fetching data. Check the console for details.');
      },
    })
  }
}
