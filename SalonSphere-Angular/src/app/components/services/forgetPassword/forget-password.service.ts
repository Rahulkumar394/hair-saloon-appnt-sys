import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  private baseURL: String = 'http://localhost:8081';

  constructor(private http:HttpClient) { }

  sendOTP(email:any){
        return this.http.get(`${this.baseURL}/sendOTP/${email}`);
      }

  setPassword(data:any){
  return this.http.post(`${this.baseURL}/update-password`,data);
  }    
}
