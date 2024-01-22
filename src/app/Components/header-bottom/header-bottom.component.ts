import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-header-bottom',
  templateUrl: './header-bottom.component.html',
  styleUrls: ['./header-bottom.component.css']
})
export class HeaderBottomComponent implements OnInit {
  isNavbarCollapsed = true;
  isUserRegistered!: boolean;
  constructor(private service: ServiceService) { }

  ngOnInit() {
    // Subscribe to changes in the registration state
    this.service.isUserRegistered$.subscribe((isRegistered) => {
      this.isUserRegistered = isRegistered;
    });
  }

}
