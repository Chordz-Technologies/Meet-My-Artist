import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Services/service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header-bottom',
  templateUrl: './header-bottom.component.html',
  styleUrls: ['./header-bottom.component.css'],
})
export class HeaderBottomComponent implements OnInit {
  isNavbarCollapsed = true;
  isUserLoggedIn: boolean = false;
  userType: string = '';
  searchTerm: string = '';
  showModal = false;
  selectedDate: string = '';
  userId = this.getUserId();
  showEventModal = false;
  isMenuOpen = false;
  // userType1 = localStorage.getItem('userType');

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private service: ServiceService
  ) {}

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
    // const userId = this.getUserId();
    if (this.userId) {
      // Navigate to the updateRegistrationForm route with uid parameter
      this.router.navigate(['/updateRegistrationForm', this.userId]);
    } else {
      console.error('User ID not found in local storage');
      // Handle the case where userId is not found in local storage
    }
  }

  eventManageForm(): void {
    // const userId = this.getUserId();
    if (this.userId) {
      // Navigate to the updateRegistrationForm route with uid parameter
      this.router.navigate(['/userEvents', this.userId]);
    } else {
      console.error('User ID not found in local storage');
      // Handle the case where userId is not found in local storage
    }
  }

  onSearch(): void {
    if (this.searchTerm.trim() !== '') {
      this.router.navigate(['/search', this.searchTerm]);
      this.searchTerm = '';
      // window.location.reload();
    }
  }

  createEvent() {
    const userStatus = localStorage.getItem('status');

    if (this.userType === 'user' || this.userType === 'organizer') {
      if (userStatus === 'Active') {
        this.router.navigate(['/eventRegistration']);
      } else {
        this.showEventModal = true;
      }
    } else {
      // Handle other user types if needed
    }
  }

  goToSubscription() {
    if (this.userType === 'user') {
      this.router.navigate(['/userSubscription']);
    } else if (this.userType === 'organizer') {
      this.router.navigate(['/organizerSubscription']);
    }
    this.hideModal();
  }

  hideModal() {
    this.showEventModal = false;
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedDate = ''; // Reset selectedDate
  }

  saveDate() {
    this.service.openToWork(this.userId, this.selectedDate).subscribe({
      next: () => {
        this.toastr.success('Artist booked successfully!', 'Success');
        this.closeModal();
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
