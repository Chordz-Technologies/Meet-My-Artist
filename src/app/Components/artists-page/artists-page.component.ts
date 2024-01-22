import { Component } from '@angular/core';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-artists-page',
  templateUrl: './artists-page.component.html',
  styleUrls: ['./artists-page.component.css']
})
export class ArtistsPageComponent {
  products: any[] = [];

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.getProductsList();
  }

  getProductsList() {
    this.service.getProductDetails().subscribe({
      next: (res: any) => {
        this.products = res;
      },
      error: (err: any) => {
        alert(err);
      }
    });
  }

}
