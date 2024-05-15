import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopServiceInfoService {

  constructor(private httpClient:HttpClient) { }

  //baseURL for api calling
  baseURL:string = "http://localhost:8081/customer/view-services";

  getShopServiceInfo(ShopId:any){
      console.log("this is you shop id"+ShopId);
      return  this.httpClient.get(`${this.baseURL}/${ShopId}`);
  }
}
