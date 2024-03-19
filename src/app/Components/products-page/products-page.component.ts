import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {
  products: any[] = [];
  url = 'https://api.meetmyartist.in/';

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.getProductsList();
  }

  getProductsList() {
    this.service.getProductDetails().subscribe({
      next: (res: any) => {
        this.products = res.all_products;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
}
