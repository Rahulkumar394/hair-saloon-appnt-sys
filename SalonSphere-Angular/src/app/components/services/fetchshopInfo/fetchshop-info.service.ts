import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class FetchshopInfoService {
  baseURL: string = 'http://localhost:8081/shopkeeper/getshopbyemail';
  constructor(private http:HttpClient) { }

  fetchshopInfo(shopEmail:string|null){

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + Cookie.get('token'));

    return this.http.post(`${this.baseURL}`,shopEmail,{ headers });
  }

  
}
