import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
// import { ServiceService } from 'src/app/Services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-bottom',
  templateUrl: './header-bottom.component.html',
  styleUrls: ['./header-bottom.component.css']
})
export class HeaderBottomComponent implements OnInit {
  isNavbarCollapsed = true;
  isUserLoggedIn: boolean = false;
  userType: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isUserLoggedIn = loggedIn;
      this.userType = this.authService.getUserType();
    });
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  openUpdateForm(): void {
    const userId = this.getUserId();
    if (userId) {
      // Navigate to the updateRegistrationForm route with uid parameter
      this.router.navigate(['/updateRegistrationForm', userId]);
    } else {
      console.error('User ID not found in local storage');
      // Handle the case where userId is not found in local storage
    }
  }

  eventManageForm(): void {
    const userId = this.getUserId();
    if (userId) {
      // Navigate to the updateRegistrationForm route with uid parameter
      this.router.navigate(['/eventManage', userId]);
    } else {
      console.error('User ID not found in local storage');
      // Handle the case where userId is not found in local storage
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
