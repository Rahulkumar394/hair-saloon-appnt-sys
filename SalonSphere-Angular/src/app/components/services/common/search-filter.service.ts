import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class SearchFilterService {

  constructor(private http:HttpClient) { }

  searchShops(keyword:any){
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + Cookie.get('token'));
    return this.http.get("http://localhost:8081/customer/search/"+`${keyword}`, { headers });
  }
}
