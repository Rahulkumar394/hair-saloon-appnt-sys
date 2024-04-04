import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class AddFeedbackService {

  constructor(private httpClient:HttpClient) { }

  //baseURL for api calling
  baseURL:string = 'http://localhost:8081/customer/add-feedback';

  addFeedback(feedback:any){
    const headers = new HttpHeaders().set('Authorization','Bearer '+Cookie.get('token'));
    return this.httpClient.post(`${this.baseURL}`,feedback, {headers});
  }

}
