import { Component } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import Swal from 'sweetalert2';
import { ShowShopOwnerService } from '../../../../../services/show-shop-owner/show-shop-owner.service';
import { ImageService } from '../../../../../services/common/image.service';
import { FormControl, FormGroup } from '@angular/forms';
import { UpdateUserProfileService } from '../../../../../services/updateUserProfile/update-user-profile.service';
import { Router } from '@angular/router';

interface shopOwner{
  firstName:string ;
  lastName:string;
  email:string;
  contactNumber:string;
  profile:string;
}

@Component({
  selector: 'app-update-shopkeeper-profile',
  templateUrl: './update-shopkeeper-profile.component.html',
  styleUrl: './update-shopkeeper-profile.component.css'
})
export class UpdateShopkeeperProfileComponent {
  // data:any [] = [];
  owner!:shopOwner;
  
  profileFile: any;
  profileImage:any;
  
  firstName: string | null = '';
  lastName: string | null = '';
  email: string | null = '';
  contactNumber: string | null = '';

  constructor(
    private showShopOwnerService:ShowShopOwnerService,
    private upload: ImageService,
    private updateUserProfile: UpdateUserProfileService,
    private router:Router,
    ){}
  
    userProfile = new FormGroup({
      userId: new FormControl(Cookie.get('userId')),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      contactNumber: new FormControl(''),
    })


  ngOnInit(): void {
    this.showShopOwnerService.getShopkeeper().subscribe((data:any)=>{
      this.owner=data;
      this.firstName=data.firstName;
      this.lastName=data.lastName;
      this.email=data.email;
      this.contactNumber=data.contactNumber;
      console.log(data);
    }),
    (error:any)=>{
      console.log("this is getShopkeeper Error: ",error)
    };

    this.showShopOwnerService
      .getShopkeeper()
      .subscribe((data: any) => {
        this.userProfile.patchValue(data); // Patch form values with fetched data
        console.log('From Init', this.userProfile.value);
      });
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
        window.location.reload();
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
  
  //main method for update profile
  updateProfile(){

    let message = this.validateName(
      this.userProfile.value.firstName,
      this.userProfile.value.lastName
    );

    if (message != '') {
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
      });
      return;
    }

    //Check email
    message = this.validateEmail(this.userProfile.value.email);

    if (message != '') {
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
      });
      return;
    }

    //check contact number
    message = this.validateContactNumber(this.userProfile.value.contactNumber);

    if (message != '') {
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
      });
      return;
    }

    if (message != '') {
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
      });
      return;
    }

    this.updateUserProfile.updateProfile(this.userProfile.value).subscribe((response:any)=>{
      console.log(response);
      this.router.navigate(['/shopkeeper/shopkeeperProfile']);
    }),
    (error: any) => {
      
      Swal.fire({
        title: 'Oops',
        text: 'Caught an Error',
        icon: 'error',
      });
    };
    
  }

  //Validate the name fields
  validateName(firstName: any, lastName: any): string {
    let message = '';

    // Check if either of the fields is empty
    if (!firstName || !lastName) {
      message = 'Please enter the first name and last name';
      return message;
    }

    // Check if the first and last names contain at least two characters
    if (firstName.length < 2 || lastName.length < 2) {
      message =
        'First name and last name must contain at least two characters each.';
      return message;
    }

    // Check if the first and last names contain only alphabets
    const nameRegex = /^[A-Za-z]+$/;

    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      message = 'First name and last name must contain only alphabets.';
      return message;
    }

    // If all validations pass
    return message; // Return an empty string indicating success
  }

  //validate the email
  validateEmail(email: any): string {
    let message = '';

    if (!email) {
      message = 'Please Enter the email';
      return message;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-z]{2,3}$/;
    if (!emailRegex.test(email)) {
      message = 'Please enter a valid email address.';
      return message;
    }

    // If all validations pass
    return message; // Return an empty string indicating success
  }

  validateContactNumber(contactNumber: any): string {
    let message = '';

    //check if the contactNumber is empty or not
    if (!contactNumber) {
      message = 'Please Enter the Contact Number';
      return message;
    }

    //check if the contact number contain only 10 digit
    // if (contactNumber.length != 10) {
    //   message = 'Please Enter the 10 digit Contact number';
    //   return message;
    // }

    // Check if the contact number is valid
    const contactNumberRegex = /^\d{10}$/; // assuming a 10-digit number

    if (!contactNumberRegex.test(contactNumber)) {
      message = 'Please enter a valid contact number.';
      return message;
    }

    // If all validations pass
    return message; // Return an empty string indicating success
  }
  
  }
  