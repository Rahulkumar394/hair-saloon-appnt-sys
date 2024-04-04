import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class UpdateEmployeeService {
  baseURL:string = "http://localhost:8081/shopkeeper/updateEmployee";

  constructor(private http:HttpClient) { }

  updateEmployee(data:any){
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + Cookie.get('token'));
    return this.http.post(`${this.baseURL}`, data,{ headers});
  }
}
