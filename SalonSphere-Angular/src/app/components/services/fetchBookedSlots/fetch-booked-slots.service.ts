import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';

@Injectable({
  providedIn: 'root',
})
export class FetchBookedSlotsService {
  baseURL: string = 'http://localhost:8081/shopkeeper/fetchSlotsByShopId/';
  constructor(private http: HttpClient) {}

  fetchBookedSlots(shopId: any) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + Cookie.get('token')
    );

    return this.http.post(`${this.baseURL}` + `${shopId}`, null, { headers });
  }
}
