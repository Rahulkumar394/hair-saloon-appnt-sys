import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private httpClient:HttpClient) { }

  private tokenURL:string = '/api/security/oauth/token?grant_type=client_credentials&client_id=96dHZVzsAuv3aQHgxAAqIOaaQvcOfyxOc-TyxAn_7AvNhrH7h8bCvbkS00vGHKdm_VnpQFBojVvYZxuHBXFeBA==&client_secret=lrFxI-iSEg8GK7HyAiWMTYkjOCFKJ02xfWwkHSPjNJoriM04o85KxLPr_rUZTdkYZaa9Jy1fPbij556y1w5alY1Jk0Ny3102';
  private addressURL:string = '/api/places/geocode?itemCount=5&address='

  
  generateToken(){
    console.log("come inside it");
    return this.httpClient.post(this.tokenURL,{});
  }
  
  // private tokenURL = 'https://outpost.mapmyindia.com/api/security/oauth/token'; // Replace with the actual MapmyIndia API URL

  // constructor(private httpClient: HttpClient) {}

  // generateToken() {
  //   const clientId = '96dHZVzsAutyreG2lc7ZLJdmA8s17uXrBGqHovPLtFYi-lZkajYZMT59wP1OqAZX_SnmbFWx_oJ5fCR-zzkLJ85oWcUyk-DW'; // Replace with your actual client ID
  //   const clientSecret = 'lrFxI-iSEg9_SeEIrLFJajeceS8eAcVENYOSFPzkUWFqlveeoG_-2OC4W1oRp9xneB5jRlJLJFaahkv0TmDEkKxfXbZyWhBSCTspcHvouSY='; // Replace with your actual client secret

  //   const body = {
  //     grant_type: 'client_credentials',
  //     client_id: clientId,
  //     client_secret: clientSecret,
  //   };

  //   this.httpClient.post(this.tokenURL, body).subscribe(
  //     (data: any) => {
  //       console.log('Token response:', data.access_token);
  //       // Handle the token response as needed
  //     },
  //     (error) => {
  //       console.error('Error fetching token:', error);
  //       // Handle the error
  //     }
  //   );
  // }

  getAddress(address:any, apiInfo:any){
    
     const headers = new HttpHeaders().set('Authorization',apiInfo.token_type+" "+apiInfo.access_token);
     console.log(headers);
     console.log(this.addressURL+address);
     return this.httpClient.get(this.addressURL+address,{headers}).pipe(map((results: any) => results.copResults));
  }


}
