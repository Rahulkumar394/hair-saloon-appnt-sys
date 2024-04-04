import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';

@Injectable({
  providedIn: 'root',
})
export class GetServiceInfoService {
  baseURL: string = 'http://localhost:8081';

  constructor(private http: HttpClient) {}
  fetchAllServices(shopId: any) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + Cookie.get('token')
    );

    return this.http.get(
      `http://localhost:8081/shopkeeper/showservices/${shopId}`,
      { headers }
    );
  }

  fetchServicebyId(serviceId: any) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + Cookie.get('token')
    );

    return this.http.get(
      `http://localhost:8081/shopkeeper/getService/${serviceId}`,
      { headers }
    );
  }

  fetchShopServicesWithServiceId(shopId: any) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + Cookie.get('token')
    );
    return this.http.get(`${this.baseURL}`+`/shopkeeper/get-service-name/${shopId}`,{headers});
  }
}
