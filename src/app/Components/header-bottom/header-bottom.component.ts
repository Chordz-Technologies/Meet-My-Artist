import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Services/service.service';
@Component({
  selector: 'app-header-bottom',
  templateUrl: './header-bottom.component.html',
  styleUrls: ['./header-bottom.component.css']
})
export class HeaderBottomComponent implements OnInit {
  isNavbarCollapsed = true;
  isUserLoggedIn: boolean = false;
  userType: string = '';
  searchTerm: string = '';
  showModal = false;
  selectedDate: string = '';
  userId = this.getUserId();

  constructor(private authService: AuthService, private router: Router, private service: ServiceService) { }

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
        this.closeModal();
      },
      error: (err: any) => {
        alert(err);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
