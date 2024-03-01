import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/Services/service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-organizer-profile-page',
  templateUrl: './organizer-profile-page.component.html',
  styleUrls: ['./organizer-profile-page.component.css']
})
export class OrganizerProfilePageComponent implements OnInit {
  organizer: any;
  public userId!: number;
  isUserLoggedIn: any;

  constructor(private service: ServiceService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val => {
      this.userId = val['uid'];
      this.service.getUserDetailsByID(this.userId)
        .subscribe({
          next: (res: any) => {
            this.organizer = res.user_details; // Extracting the array of artists
          },
          error: (err: any) => {
            console.log(err);
          }
        })
    })
  }

  onLinkClick(event: MouseEvent, link: string): void {
    if (!this.isUserLoggedIn) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    // Redirect logic for logged-in users
    window.location.href = link;
  }
}
