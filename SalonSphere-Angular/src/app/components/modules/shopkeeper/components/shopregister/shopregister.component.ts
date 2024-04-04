import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ShopregisterService } from '../../../../services/shopregister/shopregister.service';
import { PincodeService } from '../../../../services/common/pincode.service';
import { ImageService } from '../../../../services/common/image.service';
import { Cookie } from 'ng2-cookies';
import { CookieOptions, response } from 'express';

interface Location {
  city: string;
  district: string;
  state: string;
}

@Component({
  selector: 'app-shopregister',
  templateUrl: './shopregister.component.html',
  styleUrl: './shopregister.component.css',
})
export class ShopregisterComponent {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private shopregisterService: ShopregisterService,
    private postalCodeService: PincodeService,
    private fb: FormBuilder,
    private upload: ImageService
  ) {}

  coverImage: any;
  licence: any;
  cities: Location[] = [];

  licenceCNF:boolean = false;
  coverCNF:boolean = false;

  licenceFile: any;
  licenceName: string='';


  register = new FormGroup({
    userId: new FormControl(Cookie.get('userId')),
    shopName: new FormControl('', Validators.required),
    licenceNo: new FormControl('', Validators.required),
    licenseDocument: new FormControl(''),
    coverImage: new FormControl(''),
    shopEmail: new FormControl('', Validators.required),
    shopContactNo: new FormControl('', Validators.required),
    openingTime: new FormControl('', Validators.required),
    closingTime: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    landmark: new FormControl('', Validators.required),
    pincode: new FormControl('', Validators.required),
    shopCity: new FormControl('', Validators.required),
    district: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    shopTiming: new FormControl(''),
    // country: new FormControl('',Validators.required),
  });

  ngOnInit(): void {
    this.register = this.formBuilder.group({
      userId: [Cookie.get('userId')],
      shopName: [''],
      licenceNo: [''],
      licenseDocument: [''],
      coverImage: [''],
      shopEmail: [''],
      shopContactNo: [''],
      openingTime: [''],
      closingTime: [''],
      address: [''],
      landmark: [''],
      pincode: [''],
      shopCity: [''],
      district: [''],
      state: [''],
      shopTiming:['']
    });
  }
  goBack(){
    window.history.back();
  }


  onPincodeChange(pincode: string) {
    console.log('Pincode Fn');

    this.postalCodeService.fetchaddress(pincode).subscribe((data: any) => {
      data[0].PostOffice.forEach((postOffice: any) => {
        this.register.patchValue({
          district: postOffice.District,
          state: postOffice.State,
        });
      });

      if (data && data[0] && data[0].PostOffice) {
        this.cities = data[0].PostOffice.map((postOffice: any) => ({
          city: postOffice.Name,
          district: postOffice.District,
          state: postOffice.State,
        }));
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Pincode does not exist !!!',
          icon: 'info',
        });
      }
    });
  }

  // Image Uploading 
  uploadFile(event: any){    
    console.log("call upload file function")

    this.coverImage = event.target.files[0];

          this.coverCNF=true;
    //change the name of cover image
    this.coverImage = new File([this.coverImage], 'cover_image_'+this.register.value.shopContactNo+'.jpg');

    console.log('file', this.coverImage);
    return
    
  }
// //////////////////////////////////////////////////////////////////////////////////////////
  //licence uploading
  uploadLicence(event: any){
    this.licenceFile = event.target.files[0];
    console.log("call upload licence function")

    this.licenceCNF = true;
    //change ther name of licence document
    this.licenceFile = new File([this.licenceFile],'licence_'+this.register.value.shopContactNo+'.jpg');
    
    console.log(this.licenceFile);
    
    return;
  }

  // //////////////////////////////////////////////////////////////////////////////////////////

  isImageFile(file: File): boolean {
    const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
    return allowedFormats.includes(file.type);
  }


  //Validate the data of the form and send the data to the service
  doSubmit() {
    // alert('values comes');
    
    this.register.value.licenseDocument= 'licence_'+this.register.value.shopContactNo+'.jpg';
    this.register.value.coverImage= 'cover_image_'+this.register.value.shopContactNo+'.jpg';
    console.log(this.register.value);

    this.register.value.shopTiming = this.register.value.openingTime+'-'+this.register.value.closingTime; 

    //check first name and last name
    let message = this.validateName(this.register.value.shopName);

    if (message != '') {
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
      });
      return;
    }

    //Check email
    message = this.validateEmail(this.register.value.shopEmail);

    if (message != '') {
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
      });
      return;
    }

    //check contact number
    message = this.validateContactNumber(this.register.value.shopContactNo);

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

    // creating formdata to send image to backend for storing in folder structure
    let formData = new FormData();
    formData.set('file', this.coverImage);
  

    this.upload.uploadImage(formData).subscribe((data: any) => {
      console.log(data);
    },
    error=>{
      Swal.fire({
        title: 'Error!',
        text: 'error occured while uploading the image',
        icon: 'error',
      });
  });

  //send image to backend for storing in folder structure
    formData.set('file', this.licenceFile);
    this.upload.uploadImage(formData).subscribe(response=>{
      console.log(response);
    },
    error=>{
      Swal.fire({
        title: 'Error!',
        text: 'error occured while uploading the licence',
        icon: 'error',
      });
    });




    //if everything is okey then call the service method
    console.log('API CAlling', this.register.value);
    this.shopregisterService.registerShop(this.register.value).subscribe(
      (response: any) => {
        console.log('Response from server : ', response);
        Swal.fire({
          title: 'Shop Registered!!',
          text: 'Your Shop Registered successfully',
          icon: 'success',
        });
        this.router.navigate(['/shopkeeper/view-shop']);
      },
      (
        // if any  error occured while registering user
        error: any
      ) => {
        Swal.fire({
          title: 'Server Error',
          text: 'Your Email or Shop is already registered',
          icon: 'error',
        });
      }
    );
  }

  //Validate the name fields
  validateName(shopName: any): string {
    let message = '';

    // Check if either of the fields is empty
    if (!shopName) {
      message = 'Invalid Shop Name';
      return message;
    }

    // Check if the first and last names contain at least two characters
    if (shopName.length < 2) {
      message = 'Shop name too short';
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

    const contactNumberRegex = /^\d{10}$/; // assuming a 10-digit number

    if (!contactNumberRegex.test(contactNumber)) {
      message = 'Please enter a valid contact number.';
      return message;
    }

    // If all validations pass
    return message; // Return an empty string indicating success
  }

  checkPassword(password: any): string {
    let message = '';

    //check the password empty or not
    if (!password) {
      message = 'Both fields are required.';
      return message;
    }

    // Check if the password is between 8 to 16 characters
    if (password.length < 8 && password.length > 16) {
      message = 'Password must be between 8 to 16 characters.';
      return message;
    }

    // If all validations pass
    return message; // Return an empty string indicating success
  }

  searchByPincode(data: string) {
    console.log('Inside method' + data);
    this.onPincodeChange(data);
    // if (this.register.invalid) {
    //   return;
    // }
    // const pincode = this.register.get('pincode')?.value;
  }
}