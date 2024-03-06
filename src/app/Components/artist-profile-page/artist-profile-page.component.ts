import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/Services/service.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-artist-profile-page',
  templateUrl: './artist-profile-page.component.html',
  styleUrls: ['./artist-profile-page.component.css']
})
export class ArtistProfilePageComponent implements OnInit {
  artist: any;
  public userId!: number;
  images: any[] = [];
  ArtistProfileimage: any[] = [];
  isUserLoggedIn: boolean = false; // Default value
  url = 'https://meetmyartist.beatsacademy.in/';
  modalDisplay = 'none';

  constructor(private service: ServiceService, private activatedRoute: ActivatedRoute, public sanitizer: DomSanitizer, private toastr: ToastrService) { }

  openModal() {
    this.modalDisplay = 'block';
  }

  closeModal() {
    this.modalDisplay = 'none';
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val => {
      this.userId = val['uid'];
      this.fetchData(this.userId);
      this.service.getUserDetailsByID(this.userId)
        .subscribe({
          next: (res: any) => {
            this.artist = res.user_details; // Extracting the array of artists
          },
          error: (err: any) => {
            console.log(err);
          }
        })
    })

    const status = localStorage.getItem('status');
    if (status === 'Active') {
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn = false;
    }
  }

  fetchData(userId: number) {
    this.service.getMultipleImages(userId).subscribe(
      (res => {
        this.images = Object.keys(res.base64images).map(key => ({ src: key, data: res.base64images[key] }));
      }),
      (error => {
        this.toastr.error('Error fetching images', 'Error');
      })
    );
    // this.service.getArtistProfileImage(userId).subscribe(
    //   (res => {
    //     this.ArtistProfileimage = res.base64_photo; // Assuming the response is an array of objects with 'fileName' and 'base64Image' properties
    //   }),
    //   (error => {
    //     console.error('Error fetching images:', error);
    //     this.toastr.error('Error fetching images', 'Error');
    //   })
    // );
  }

  onLinkClick(event: MouseEvent, link: string): void {
    event.preventDefault();
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

  isPastDate(date: Date): boolean {
    const today = new Date();
    return new Date(date) < today;
  }

  // Check if the booking is for today
  isBookedToday(date: Date): boolean {
    const today = new Date();
    return new Date(date).toDateString() === today.toDateString();
  }
}
