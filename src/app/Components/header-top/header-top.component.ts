import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.css']
})
export class HeaderTopComponent implements OnInit {
  isUserRegistered!: boolean;
  constructor(private service: ServiceService) { }

  ngOnInit() {
    // Subscribe to changes in the registration state
    this.service.isUserRegistered$.subscribe((isRegistered) => {
      this.isUserRegistered = isRegistered;
    });
  }
}
