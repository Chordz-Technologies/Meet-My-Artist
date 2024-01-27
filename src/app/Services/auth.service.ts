// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  // Observable to track authentication state
  isLoggedIn = this.loggedIn.asObservable();

  constructor() {
    // You can initialize the authentication state based on a saved token or other criteria
    this.checkAuthentication();
  }

  login() {
    // Perform authentication logic (e.g., check credentials)
    // For simplicity, let's consider the user as authenticated on successful login
    this.loggedIn.next(true);
    // You may also want to save a token or user information in local storage
  }

  logout() {
    // Perform logout logic (e.g., clear credentials, remove token)
    this.loggedIn.next(false);
    // You may also want to remove the saved token or user information from local storage
  }

  private checkAuthentication() {
    // Check if the user is already authenticated based on some criteria (e.g., saved token)
    // For simplicity, let's assume the user is not authenticated initially
    this.loggedIn.next(false);
  }
}
