import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class FetchReviewsService {
  baseURL:string = "http://localhost:8081/customer/get-all-feedback";

constructor(private http:HttpClient) { }
getReviews(shopId:any){
  console.log("FeedBack value",shopId)
  return this.http.get(`${this.baseURL}/${shopId}`);
}
}
