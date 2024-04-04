import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class FetchEmpInfoService {
  baseURL: string = 'http://localhost:8081/shopkeeper/show-emp/';
  constructor(private http:HttpClient) { }

  fetchEmpInfo(employeeId:string|null){

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + Cookie.get('token'));

    return this.http.post(`${this.baseURL}`+`${employeeId}`,null,{ headers });
  }
}
