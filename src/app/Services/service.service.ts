import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
// import { product } from '../model';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getArtistDetails(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/artist`);
  }

  getProductDetails(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/product`);
  }

  private isUserRegisteredSubject = new BehaviorSubject<boolean>(false);
  isUserRegistered$ = this.isUserRegisteredSubject.asObservable();

  setRegistrationState(isRegistered: boolean): void {
    this.isUserRegisteredSubject.next(isRegistered);
  }
}
