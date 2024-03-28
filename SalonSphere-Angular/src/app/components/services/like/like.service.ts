import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies/cookie';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  private baseURL: String = 'http://localhost:8081/customer/';
  constructor(private http: HttpClient) {}

  like(likes: any) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + Cookie.get('token')
    );
    return this.http.post(`${this.baseURL}/like/${likes}`, null, { headers });
  }

  unlike(likes: any) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + Cookie.get('token')
    );
    return this.http.post(`${this.baseURL}/unlike/${likes}`, null, { headers });
  }
}
