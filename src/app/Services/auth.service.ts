// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: BehaviorSubject<boolean>;

  constructor() {
    // Initialize isLoggedIn BehaviorSubject based on the value stored in localStorage
    const storedLoggedInStatus = localStorage.getItem('isLoggedIn');
    const initialLoggedInStatus = storedLoggedInStatus
      ? JSON.parse(storedLoggedInStatus)
      : false;
    this.isLoggedIn = new BehaviorSubject<boolean>(initialLoggedInStatus);
  }

  getUserType(): string {
    return localStorage.getItem('userType') || ''; // Retrieving user type from localStorage
  }

  login(
    userType: string,
    userId: string,
    status: string,
    userDetails: { name: string; email: string; contact: string }
  ) {
    // Your login logic here
    // Set user type in localStorage or wherever you store user information
    localStorage.setItem('userType', userType); // Setting user type in localStorage
    localStorage.setItem('userId', userId);
    localStorage.setItem('status', status);
    localStorage.setItem('isLoggedIn', 'true'); // Update isLoggedIn status in localStorage
    this.isLoggedIn.next(true);

    // Store user details
    localStorage.setItem('userName', userDetails.name);
    localStorage.setItem('userEmail', userDetails.email);
    localStorage.setItem('userContact', userDetails.contact);
  }

  logout() {
    // Your logout logic here
    // Clear user type and isLoggedIn status from localStorage
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    localStorage.removeItem('status');
    localStorage.removeItem('isLoggedIn');

    // Clear user details
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userContact');

    this.isLoggedIn.next(false);
    history.pushState(null, '', '/');
  }

  getUserDetails() {
    return {
      name: localStorage.getItem('userName') || '',
      email: localStorage.getItem('userEmail') || '',
      contact: localStorage.getItem('userContact') || '',
    };
  }
}
