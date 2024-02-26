import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { ServiceService } from 'src/app/Services/service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.css']
})
export class HeaderTopComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  userType: string = ''; // Add this line to define userType

  constructor(private authService: AuthService, private router: Router, private service: ServiceService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isUserLoggedIn = loggedIn;
      this.userType = this.authService.getUserType();
      console.log('User type:', this.userType); // Add this line to log userType
    });

    // Clear browser history and prevent going back
    history.pushState(null, '', '/');
    this.router.navigate(['/']); // Redirect to login page after logout
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


  // isUserLoggedIn!: boolean;

  // constructor(private authService: AuthService, private router: Router) {}

  // ngOnInit() {
  //   this.authService.isLoggedIn.subscribe((loggedIn) => {
  //     this.isUserLoggedIn = loggedIn;
  //   });
  // }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
