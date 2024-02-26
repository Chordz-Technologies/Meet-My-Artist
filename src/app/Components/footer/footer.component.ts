import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  userType: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isUserLoggedIn = loggedIn;
      if (loggedIn) {
        this.userType = this.authService.getUserType();
      } else {
        this.userType = ''; // Reset userType when user logs out
      }
    });
  }
}
