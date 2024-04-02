import { Component } from '@angular/core';
import { ShowShopOwnerService } from '../../../../services/show-shop-owner/show-shop-owner.service';
import { response } from 'express';
import { error } from 'console';

interface shopOwner{
  fullName:string ;
  email:string;
  contactNumber:string;
}

@Component({
  selector: 'app-shopkeeper-profile',
  templateUrl: './shopkeeper-profile.component.html',
  styleUrl: './shopkeeper-profile.component.css'
})
export class ShopkeeperProfileComponent {
// data:any [] = [];
owner!:shopOwner;

constructor(private showShopOwnerService:ShowShopOwnerService){}

ngOnInit(): void {
  this.showShopKeeper();
}

showShopKeeper(){
  this.showShopOwnerService.getShopkeeper().subscribe((data:any)=>{
    this.owner=data;
    console.log(data);
  }),
  (error:any)=>{
    console.log("this is getShopkeeper Error: ",error)
  }
}

}
