import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class GetCustomerInfoService {
  baseURL:string = "http://localhost:8081/customer/userInfo";

  constructor(private http:HttpClient) { }
  getUserInfo(userId:any){
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + Cookie.get('token'));
  
    return this.http.get(`${this.baseURL}/${userId}`,{ headers});
  }
}
