import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopInfoService {

  constructor(private httpClient:HttpClient) { }

  baseURL: string = 'http://localhost:8081/customer/get-shop-by-shopId';


  fetchshopInfo(shopId:any){

    return this.httpClient.get(`${this.baseURL}/${shopId}`);
  }
}
