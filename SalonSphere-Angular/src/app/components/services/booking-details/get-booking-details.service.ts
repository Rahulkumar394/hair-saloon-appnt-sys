import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class GetBookingDetailsService {

  constructor(private httpClient: HttpClient) { }

  baseURL:string = 'http://localhost:8081/customer/booking-details';

  getBookingDetails(userId : any){
    const headers = new HttpHeaders().set('Authorization', 'Bearer  ' + Cookie.get('token'));
    return this.httpClient.get(`${this.baseURL}/${userId}`, {headers});
  }
}
