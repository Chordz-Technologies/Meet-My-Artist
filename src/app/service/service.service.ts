import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  //api for product
  productdata():Observable<any>{
    return this.http.get('http://localhost:3000/product');
  };

  // api for event
  eventdata():Observable<any>{
    return this.http.get("http://localhost:3000/events");
  }
}
