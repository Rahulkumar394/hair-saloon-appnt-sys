import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http:HttpClient) { }

  uploadImage(data:any){

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + Cookie.get('token'));
    return this.http.post("http://localhost:8081/shopkeeper/uploadDocument",data, { headers });
  }


  uploadProfile(data:any){

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + Cookie.get('token'));
    console.log("Service me aaya hai",data);
    return this.http.post("http://localhost:8081/uploadImage",data, { headers });

  }


}
