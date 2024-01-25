import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  // private apiUrl = 'http://localhost:3000/artist';

  constructor(private http: HttpClient) {}

  getArtistDetails(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/artist`);
  }

  getArtistById(Aid: any): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/artist/Aid`);
  }

  getOrgDetails(): Observable<any> {
    return this.http.get<any>(` http://localhost:3000/organizer`);
  }

  getOrgById(Aid: any): Observable<any> {
    return this.http.get<any>(` http://localhost:3000/organizer/Oid`);
  }

  getProductDetails(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/product`);
  }

}
