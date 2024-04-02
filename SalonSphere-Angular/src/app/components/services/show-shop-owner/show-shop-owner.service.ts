import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class ShowShopOwnerService {

  constructor(private httpClient: HttpClient) { }

  baseURL:string = "http://localhost:8081/admin/view-shopkeeper";
  baseURL2:string = "http://localhost:8081/shopkeeper/get-shopkeeper/";

  public getAllShopkeeper(){
    const token = Cookie.get('token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpClient.get(`${this.baseURL}`, { headers});
  }

  public getShopkeeper(){
    const token = Cookie.get('token');
    const userId = Cookie.get('userId');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpClient.get(`${this.baseURL2}${userId}`, { headers});
  }
}
