import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class CreateOrderService {

  baseURL:string = 'http://localhost:8081/create-order';

  constructor(private httpClient:HttpClient) { }

  createNewOrder(data:number){
    console.log(`${this.baseURL}/`+data);
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + Cookie.get('token'));
    return this.httpClient.get(`${this.baseURL}/`+data,{headers});
  }


}
