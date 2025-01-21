import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  emailData = {
    subject: '',
    email: '',
    message: '',
  };

  isUserLoggedIn: boolean = false;
  userType: string = '';
  showBackToTop: boolean = false;

  constructor(
    private authService: AuthService,
    private service: ServiceService
  ) {}

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

  sendEmail() {
    this.service.sendEmail(this.emailData).subscribe({
      next: (res: any) => {
        // console.log('Email sent successfully!', res);
        // Reset the form after sending the email
        this.emailData = {
          subject: '',
          email: '',
          message: '',
        };
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showBackToTop = window.pageYOffset > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
