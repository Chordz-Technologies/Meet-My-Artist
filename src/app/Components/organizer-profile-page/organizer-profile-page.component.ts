import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/Services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-organizer-profile-page',
  templateUrl: './organizer-profile-page.component.html',
  styleUrls: ['./organizer-profile-page.component.css'],
})
export class OrganizerProfilePageComponent implements OnInit {
  organizer: any;
  public userId!: number;
  images: any[] = [];
  OrganizerProfileImage: any[] = [];
  isUserLoggedIn: any;
  modalDisplay = 'none';
  url = 'https://api.meetmyartist.in/';
  userType = localStorage.getItem('userType');

  constructor(
    private service: ServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private toastr: ToastrService
  ) {}

  openModal() {
    if (!this.isUserLoggedIn) {
      // Only open the modal if not logged in or not subscribed
      console.log('Opening Modal');
      this.modalDisplay = 'block';
    }
  }

  closeModal() {
    console.log('Closing Modal');
    this.modalDisplay = 'none';
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => {
      this.userId = val['uid'];
      this.fetchData(this.userId);
      this.service.getUserDetailsByID(this.userId).subscribe({
        next: (res: any) => {
          this.organizer = res.user_details; // Extracting the array of artists
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    });

    const status = localStorage.getItem('status');
    if (status === 'Active') {
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn = false;
    }
  }

  fetchData(userId: number) {
    this.service.getMultipleImages(userId).subscribe(
      (res) => {
        this.images = Object.keys(res.base64images).map((key) => ({
          src: key,
          data: res.base64images[key],
        }));
      },
      (error) => {
        console.log(error);
      }
    );
    // this.service.getArtistProfileImage(userId).subscribe(
    //   (res => {
    //     this.OrganizerProfileImage = res.base64_photo; // Assuming the response is an array of objects with 'fileName' and 'base64Image' properties
    //   }),
    //   (error => {
    //     console.error('Error fetching images:', error);
    //     this.toastr.error('Error fetching images', 'Error');
    //   })
    // );
  }

  onLinkClick(event: MouseEvent, link: string): void {
    event.preventDefault();
    // Debugging line
    if (!this.isUserLoggedIn) {
      this.openModal();
    } else {
      const newTab = window.open(link, '_blank');
      if (newTab) {
        newTab.focus();
      } else {
        window.location.href = link;
      }
    }
  }

  Subscription() {
    if (this.userType === 'user') {
      this.router.navigate(['/userSubscription']);
    } else if (this.userType === 'artist') {
      this.router.navigate(['/artistSubscription']);
    } else if (this.userType === 'organizer') {
      this.router.navigate(['/organizerSubscription']);
    } else {
      this.router.navigate(['/userSubscription']);
    }
  }
}
