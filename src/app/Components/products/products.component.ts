import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productdata:any[]=[]
  constructor(private serivice:ServiceService){}
  ngOnInit(): void {  
    this.serivice.productdata().subscribe(res =>{
      this.productdata=res;
    })
    
  }


}
