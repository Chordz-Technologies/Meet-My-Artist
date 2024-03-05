import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/Services/service.service';
import { user_model } from 'src/app/model';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, NavigationStart } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user_model: user_model = new user_model()
  loginform!: FormGroup;

  isUserLoggedIn!: boolean;

  ngOnInit(): void {
    history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', () => {
      history.pushState(null, document.title, window.location.href);
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const isLoginPage = event.url === '/login'; // Adjust the URL for your login page
        if (isLoginPage) {
          // Disable browser forward option
          history.pushState({}, '', location.href);
        }
      }
    });

    this.loginform = this.fb.group({
      u_email: [''],
      u_password: [''],
      options: ['']
    })
  }

  constructor(private logindata: ServiceService, private fb: FormBuilder, private toastr: ToastrService, private router: Router, private authService: AuthService) {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isUserLoggedIn = loggedIn;
    });
  }

  loginpost_data() {
    this.user_model.uemail = this.loginform.value.u_email,
      this.user_model.upassword = this.loginform.value.u_password;
    const selectedOption = this.loginform.value.options;
    this.user_model.utypeartist = selectedOption === '2' ? 1 : 0;
    this.user_model.utypeorganizer = selectedOption === '1' ? 1 : 0;
    this.user_model.utypeuser = selectedOption === '3' ? 1 : 0;

    this.logindata.loginpost(this.user_model).subscribe({
      next: (result: any) => {
        if (result.message === 'Valid User' && result.user_type === 'user') {
          const userId = result.user_id;
          const status = result.status;
          this.router.navigate(['/']);
          this.toastr.success('Login successful as a user!', 'Success');
          const userType: string = 'user';
          this.authService.login(userType, userId.toString(), status);

        } else if (result.message === 'Valid User' && result.user_type === 'artist') {
          const userId = result.user_id;
          const status = result.status;
          this.router.navigate(['/artistsHome']);
          this.toastr.success('Login successful as an artist!', 'Success');
          const userType: string = 'artist';
          this.authService.login(userType, userId.toString(), status);

        } else if (result.message === 'Valid User' && result.user_type === 'organizer') {
          const userId = result.user_id;
          const status = result.status;
          this.router.navigate(['/']);
          this.toastr.success('Login successful as an organizer!', 'Success');
          const userType: string = 'organizer';
          this.authService.login(userType, userId.toString(), status);
        } else {
          this.toastr.error('Login failed. Please check your credentials.', 'Error');
        }

      },
      error: (err: any) => {
        console.error('Error:', err);
        this.toastr.error('Invalid credentials. Please check your credentials.', 'Error');
      }
    });
  }
}
