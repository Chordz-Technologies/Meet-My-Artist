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

  // Get user details by id API
  getUserDetailsByID(uid: number): Observable<any> {
    return this.http.get<any>(`${this.url}/userDetails/${uid}/`);
  }

  // Update user API 
  updatedata(uid: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.url}/updateUser/${uid}/`, data);
  }

  // Organizer API
  getOrganizerDetails(): Observable<any> {
    return this.http.get<any>(`${this.url}/organizersList/`);
  }

  // Product API
  getProductDetails(): Observable<any> {
    return this.http.get<any>(`${this.url}/allProducts/`);
  }

  // Events API
  getEventDetails(): Observable<any> {
    return this.http.get<any>(`${this.url}/allEvents/`);
  }

  // Login API
  loginpost(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/userLogin/`, data);
  }

  // Artist category API
  allArtistCategoriesFilter(): Observable<any> {
    return this.http.get<any>(`${this.url}/allAcategories/`);
  }

  // Organizer category API
  allOrganizerCategoriesFilter(): Observable<any> {
    return this.http.get<any>(`${this.url}/allBcategory/`);
  }

  // Subscriptions API
  getOrganizerSubscription(): Observable<any> {
    return this.http.get<any>(`${this.url}/organizerSubscriptions/`);
  }
  getUserSubscription(): Observable<any> {
    return this.http.get<any>(`${this.url}/userSubscriptions/`);
  }
  getArtistSubscription(): Observable<any> {
    return this.http.get<any>(`${this.url}/artistSubscription/`);
  }

  // Post event API
  postEvent(data: any): Observable<any> {
    return this.http.post(`${this.url}/createEvent/`, data);
  }

  // Get event API
  getEventIdByUserId(uid: number): Observable<number> {
    return this.http.get<number>(`${this.url}/getEventsbyUid/${uid}`);
  }
  getEventById(eid: number): Observable<any> {
    return this.http.get<any>(`${this.url}/eventDetails/${eid}`);
  }

  // Update event API
  updateEvent(eid: number, updateData: any): Observable<any> {
    return this.http.patch<any>(`${this.url}/partialupdateEvent/${eid}/`, updateData);
  }

  // Post user API
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

  // Images API
  getMultipleImages(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/getMultiplePhotos/${id}/`)
  }
  getArtistProfileImage(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/getProfilePhoto/${id}`)
  }
  postUserImages(imageData: any): Observable<any> {
    return this.http.post<any>(`${this.url}/addMultiplePhotos/`, imageData);
  }
  postUserProfileImage(profileimageData: any): Observable<any> {
    return this.http.post<any>(`${this.url}/addProfilePhoto/`, profileimageData)
  }

  // Search API
  search(searchTerm: string): Observable<any> {
    return this.http.get(`${this.url}/userSearch/?search_term=${searchTerm}`)
  }

  // Update user API for open to work
  openToWork(uid: any, selectedDate: string): Observable<any> {
    return this.http.put(`${this.url}/updateUser/${uid}/`, { abookeddate: selectedDate })
  }
}
