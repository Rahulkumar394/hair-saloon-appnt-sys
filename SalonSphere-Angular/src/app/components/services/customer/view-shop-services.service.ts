import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewShopServicesService {

  //base URL for API calling
  baseURL:string = 'http://localhost:8081/customer/show-services'

  constructor(private httpClient: HttpClient) { }

  fetchAllServices(shopId:any){
    return this.httpClient.get(`${this.baseURL}/${shopId}`);
  }
}
