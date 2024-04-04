import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';


@Injectable({
  providedIn: 'root'
})
export class ShowShopsService {

  constructor(private httpClient:HttpClient) { }

  //base URL for the API calling 
  baseURL:string = 'http://localhost:8081/customer/filter-by-city';

  //show shops by using city  
  showShopsByCity(city:any){
 
    //set the token in header
    console.log("service main aya hai");
    const token = Cookie.get('token');

    console.log(token);

    // const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    // console.log(this.baseURL+'/'+city);

    return this.httpClient.get(this.baseURL+'/'+city);
  }

  

  //URL for filtering
  filterURL:string = 'http://localhost:8081/customer/filter-shop';

  filterShops(serviceName:any, range:any, distance:any, city:any){

    //set the token in header
    const token = Cookie.get('token');
    console.log(token);
    // const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    //creat interface for the filtering
    interface filter{
      serviceName:string,
      price:string,
      distance:string,
      city:any,
      
    }

    //create obj of filter interface type
    const obj: filter={
      serviceName: serviceName,
      price: range,
      distance: distance,
      city:city
    };


    return this.httpClient.post(`${this.filterURL}`, obj);
  }
}
