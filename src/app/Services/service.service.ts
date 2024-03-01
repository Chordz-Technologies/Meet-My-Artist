import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Carousal API
  getCarouselImages(): Observable<any> {
    return this.http.get<any>(`${this.url}/getCarouselImages/`);
  }
 
  // Artist API
  getArtistDetails(): Observable<any> {
    return this.http.get<any>(`${this.url}/artistsList/`);
  }

  getUserDetailsByID(uid: number): Observable<any> {
    return this.http.get<any>(`${this.url}/userDetails/${uid}/`);
  }

  updatedata(uid: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.url}/updateUser/${uid}/`, data);
  }

  // Organizer API
  getOrganizerDetails(): Observable<any> {
    return this.http.get<any>(`${this.url}/organizersList/`);
  }

  getProductDetails(): Observable<any> {
    return this.http.get<any>(`${this.url}/allProducts/`);
  }

  getEventDetails(): Observable<any> {
    return this.http.get<any>(`${this.url}/allEvents/`);
  }

  loginpost(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/userLogin/`, data);
  }

  allArtistCategoriesFilter(): Observable<any> {
    return this.http.get<any>(`${this.url}/allAcategories/`);
  }

  allOrganizerCategoriesFilter(): Observable<any> {
    return this.http.get<any>(`${this.url}/allBcategory/`);
  }

  getOrganizerSubscription(): Observable<any> {
    return this.http.get<any>(`${this.url}/organizerSubscriptions/`);
  }

  getUserSubscription(): Observable<any> {
    return this.http.get<any>(`${this.url}/userSubscriptions/`);
  }

  getArtistSubscription(): Observable<any> {
    return this.http.get<any>(`${this.url}/artistSubscription/`);
  }

  //post event
  postEvent(data: any): Observable<any> {
    return this.http.post(`${this.url}/createEvent/`, data);
  }

  //get event
  getEventIdByUserId(uid: number): Observable<number> {
    return this.http.get<number>(`${this.url}/getEventsbyUid/${uid}`);
  }

  getEventById(eid: number): Observable<any> {
    return this.http.get<any>(`${this.url}/eventDetails/${eid}`);
  }

  //update event
  updateEvent(eid: number, updateData: any): Observable<any> {
    return this.http.put<any>(`${this.url}/updateEvent/${eid}`, updateData);
  }

  //post data
  postdata(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/createUser/`, data);
  }

  // artist category
  // artist_category(): Observable<any> {
  //   return this.http.get<any>(`${this.url}/allAcategories/`);
  // }

  postToWishlist(uid: number, wished_user_id: number): Observable<any> {
    return this.http.post<any>(`${this.url}/addtoWishlist/${uid}/${wished_user_id}/`, {});
  }

  getWishlistByID(uid: number): Observable<any> {
    return this.http.get<any>(`${this.url}/getWishlist/${uid}/`);
  }

  removeWishlistByID(uid: number, wished_user_id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/removefromWishlist/${uid}/${wished_user_id}/`);
  }



  // search():Observable<any> {
  //   return this.http.get(`https://meetmyartist.beatsacademy.in/userSearch/search/?search_term=Akshay`)
  // }


  // private isUserRegisteredSubject = new BehaviorSubject<boolean>(false);
  // isUserRegistered$ = this.isUserRegisteredSubject.asObservable();

  // setRegistrationState(isRegistered: boolean): void {
  //   this.isUserRegisteredSubject.next(isRegistered);
  // }
}
