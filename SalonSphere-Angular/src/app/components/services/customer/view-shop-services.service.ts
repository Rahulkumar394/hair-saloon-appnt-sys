import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';

@Injectable({
  providedIn: 'root',
})
export class ViewShopServicesService {
  //base URL for API calling
  baseURL: string = 'http://localhost:8081/shopkeeper/showservices';

  constructor(private httpClient: HttpClient) {}

  fetchAllServices(shopId: any) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + Cookie.get('token')
    );
    console.log("Header Set",headers,shopId)

    return this.httpClient.get(`${this.baseURL}/${shopId}`, { headers });
  }
}
