import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Services/service.service';


@Component({
  selector: 'app-organizer-registration',
  templateUrl: './organizer-registration.component.html',
  styleUrls: ['./organizer-registration.component.css']
})
export class OrganizerRegistrationComponent {

  user = {
    fullName: '',
    email: '',
    password: ''
  };
  constructor(private router: Router, private service: ServiceService) { }

  onSubmit() {
    // Handle form submission logic here
    console.log('Form submitted:', this.user);
    // After successful submission, navigate back to the home page
    this.router.navigate(['/']);

    // Update the organizer registration state
    this.service.setRegistrationState(true);
  }
}
