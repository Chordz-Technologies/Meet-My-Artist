import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  images: any[] = [];

  constructor(
    private service: ServiceService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.service.getCarouselImages().subscribe((res) => {
      // Convert the object into an array of objects
      this.images = Object.keys(res.base64images).map((key) => ({
        src: key,
        data: res.base64images[key],
      }));
    });
  }
}
