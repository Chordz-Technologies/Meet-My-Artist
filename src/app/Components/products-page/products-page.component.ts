import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {
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