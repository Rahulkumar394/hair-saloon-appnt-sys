import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class SaveTransactionService {

  constructor(private httpClient:HttpClient) { }


  saveTransactionURL:string = 'http://localhost:8081/save-transaction';
  
  saveTransaction(transactionData:any){
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + Cookie.get('token'));
    console.log("come inside the service method");
    console.log(transactionData);
    return this.httpClient.post(this.saveTransactionURL, transactionData, {headers});
  }

}
