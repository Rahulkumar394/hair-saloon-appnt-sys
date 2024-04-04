import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class BookSlotService {

  constructor(private httpClient:HttpClient) { }

  //base URL for the api
  baseURL:string = 'http://localhost:8081/customer/book-slot';

  public bookSlot(data:any){
    const token = Cookie.get('token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    console.log(headers);
    return this.httpClient.post(`${this.baseURL}`,data, {headers});
  }
}
