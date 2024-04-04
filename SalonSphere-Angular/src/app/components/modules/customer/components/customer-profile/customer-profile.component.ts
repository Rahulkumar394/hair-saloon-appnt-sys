import { Component, OnInit } from '@angular/core';
import { GetCustomerInfoService } from '../../../../services/get-customer-info.service';
import { Cookie } from 'ng2-cookies';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImageService } from '../../../../services/common/image.service';
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
  selectedFile: File | null = null; // Variable to store selected file
  profileImage:any;
  constructor(private getUserService:GetCustomerInfoService, private uploadProfileService:ImageService){}

  ngOnInit(): void {
    this.getUserService.getUserInfo(Cookie.get('userId')).subscribe((data:any)=>{
        this.user= data;
        console.log(data)
    })
  }

  // 



  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File; // Get selected file
    this.profileImage = new File([this.selectedFile],'profile_'+Cookie.get('userId')+'.jpg');
    this.uploadProfilePicture();
  }

  uploadProfilePicture(): void {
    if (!this.profileImage) {
      return; // No file selected
    }

    // Create FormData object
    let formData: FormData = new FormData();
    
    formData.set('file', this.profileImage); // Append file to FormData

    // Send FormData to backend using HttpClient
  
    this.uploadProfileService.uploadProfile(formData).subscribe(
      (response: any) => {
        console.log('Profile picture uploaded successfully:', response);
        // Refresh user profile data after upload
        this.getUserService.getUserInfo(Cookie.get('userId')).subscribe((data: any) => {
          this.user = data;
        });
      },
      (error: any) => {
        console.log(error)
      }
    );
  }
  
}
