import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor() { }

  //delete the token from the cookie
  public logout(){

    console.log("come inside the logout");

    //delete all the information of the current login user
    Cookie.delete('token');
    Cookie.delete('name','/','localhost');
    Cookie.delete('role','/','localhost');

    if(Cookie.check('userId')){
    Cookie.delete('userId','/','localhost')
    }

    console.log("logout successfully");
  }
}
