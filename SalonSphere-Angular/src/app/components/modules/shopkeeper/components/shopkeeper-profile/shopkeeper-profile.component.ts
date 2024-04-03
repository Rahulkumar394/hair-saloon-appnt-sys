import { Component } from '@angular/core';
import { ShowShopOwnerService } from '../../../../services/show-shop-owner/show-shop-owner.service';
import { response } from 'express';
import { error } from 'console';
import Swal from 'sweetalert2';
import { Cookie } from 'ng2-cookies';
import { ImageService } from '../../../../services/common/image.service';

interface shopOwner{
  firstName:string ;
  lastName:string;
  email:string;
  contactNumber:string;
  profile:string;
}

@Component({
  selector: 'app-shopkeeper-profile',
  templateUrl: './shopkeeper-profile.component.html',
  styleUrl: './shopkeeper-profile.component.css'
})
export class ShopkeeperProfileComponent {
// data:any [] = [];
owner!:shopOwner;

profileFile: any;
profileImage:any;


constructor(
  private showShopOwnerService:ShowShopOwnerService,
  private upload: ImageService,
  ){}

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

uploadProfile(event: any){
  this.profileFile = event.target.files[0];
  console.log("call upload licence function")

  //change ther name of profile
  this.profileFile = new File([this.profileFile],'profile_'+Cookie.get('userId')+'.jpg');
  
  console.log(this.profileFile);
  return this.doSubmit();
};

  doSubmit(){
    let formData = new FormData();
    formData.set('file', this.profileFile);
  

    this.upload.uploadProfile(formData).subscribe((data: any) => {
      console.log(data);
    },
    error=>{
      Swal.fire({
        title: 'Error!',
        text: 'error occured while uploading the image',
        icon: 'error',
      });
  });

  this.upload.changeProfilename('profile_'+Cookie.get('userId')+'.jpg').subscribe((data: any) => {
    console.log(data);
  },
  error=>{
    console.log(error)
    Swal.fire({
      title: 'Error!',
      text: 'error occured while changing the image name',
      icon: 'error',
    });
});

}  

}
