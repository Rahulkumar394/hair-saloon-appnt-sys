import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class FetchEmployeeService {
  baseURL: string = 'http://localhost:8081/shopkeeper/show-all-emp/';
  constructor(private http:HttpClient) { }


  fetchEmployee(shopId:any){
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + Cookie.get('token'));


    return this.http.post(`${this.baseURL}`+`${shopId}`,null,{headers});
  }
}
