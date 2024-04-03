import { Component, OnInit } from '@angular/core';
import { GetCustomerInfoService } from '../../../../services/get-customer-info.service';
import { Cookie } from 'ng2-cookies';
interface userInfo{
  firstName:string,
  lastName:string,
  contactNumber:string,
  email:string,
  profile:string
}
@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.css'
})
export class CustomerProfileComponent implements OnInit{

  user!:userInfo;
  constructor(private getUserService:GetCustomerInfoService){}

  ngOnInit(): void {
    this.getUserService.getUserInfo(Cookie.get('userId')).subscribe((data:any)=>{
        this.user= data;
        console.log(data)
    })
  }
  
}
