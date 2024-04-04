import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class RequestAgainService {

  baseURL:string = "http://localhost:8081/shopkeeper/requestAgain";
  
  constructor(private http:HttpClient) { }

  refactorShop(data:any){

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + Cookie.get('token'));
    return this.http.post(`${this.baseURL}`, data,{ headers});
  }
}
