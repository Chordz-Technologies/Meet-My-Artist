import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth.service';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-user-subscription-page',
  templateUrl: './user-subscription-page.component.html',
  styleUrls: ['./user-subscription-page.component.css'],
})
export class UserSubscriptionPageComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  userType: string = '';
  userSubscriptions: any[] = [];
  isLoading: boolean = false;

  constructor(
    private service: ServiceService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
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

    this.userSubscriptionsData();
  }

  userSubscriptionsData() {
    this.service.getUserSubscription().subscribe({
      next: (res: any) => {
        this.userSubscriptions = res.user_subscriptions;
      },
      error: (err: any) => {
        console.error('Error:', err);
        // alert('Error fetching data. Check the console for details.');
      },
    });
  }

  async handleSubscription(subscription: any) {
    if (!this.isUserLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      this.isLoading = true;

      // Get user details
      const user = this.authService.getUserDetails();
      const userDetails = {
        name: user.name,
        email: user.email,
        contact: user.contact,
      };

      // Create order
      const orderResponse = await this.service
        .createOrder(subscription.sid, this.userType)
        .toPromise();

      if (orderResponse.status === 'success') {
        // Initialize Razorpay
        const paymentResponse = await this.service
          .initializeRazorpay(orderResponse, userDetails)
          .catch((error) => {
            console.error('Payment initialization failed:', error);
            this.toastr.error(
              'Payment initialization failed. Please try again.'
            );
          });

        if (paymentResponse) {
          // Verify payment
          const verificationResponse = await this.service
            .verifyPayment({
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_signature: paymentResponse.razorpay_signature,
              subscription_id: subscription.sid,
            })
            .toPromise();

          if (verificationResponse.status === 'success') {
            this.toastr.success('Subscription successful!');

            // Update user status to 'active' and update subscription date
            const userId = parseInt(localStorage.getItem('userId') || '0', 10);
            const newSubsDate = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
            if (userId) {
              const updateResponse = await this.service
                .updateUserStatus(userId, 'Active', newSubsDate)
                .toPromise();
              if (updateResponse.status === 'success') {
                this.toastr.success('User status updated to active!');
              } else {
                this.toastr.error('Failed to update user status.');
              }
            }

            // Handle successful subscription (e.g., redirect or update UI)
          } else {
            this.toastr.error(
              'Payment verification failed. Please contact support.'
            );
          }
        }
      } else {
        this.toastr.error('Failed to create order. Please try again.');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      this.toastr.error('An error occurred. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }

  // private async handlePaymentSuccess(response: any, subscription: any) {
  //   try {
  //     // Verify payment on your backend
  //     const verificationResponse = await this.service
  //       .verifyPayment({
  //         razorpay_payment_id: response.razorpay_payment_id,
  //         razorpay_order_id: response.razorpay_order_id,
  //         razorpay_signature: response.razorpay_signature,
  //         subscription_id: subscription.sid,
  //       })
  //       .toPromise();

  //     if (verificationResponse.status === 'success') {
  //       // Handle successful subscription
  //       console.log('Payment verified successfully');
  //       // Update UI or redirect user
  //     }
  //   } catch (error) {
  //     console.error('Payment verification failed:', error);
  //     // Handle verification failure
  //   }
  // }
}
