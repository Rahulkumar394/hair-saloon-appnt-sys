import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class CancelBookingService {

  constructor(private httpClient:HttpClient) { }

  //base URL for API calling
  baserURL:string = 'http://localhost:8081/customer/cancel-booking';
  cancelBooking(bookingId:string){
    console.log("come inside the cancel booking service");
    const headers = new HttpHeaders().set('Authorization', 'Bearer '+Cookie.get('token'));
    return this.httpClient.get(`${this.baserURL}/${bookingId}`,{headers});
  }
}
