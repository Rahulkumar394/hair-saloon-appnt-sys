import { Component, OnInit } from '@angular/core';
import { FetchshopInfoService } from '../../../../services/fetchshopInfo/fetchshop-info.service';
import { PincodeService } from '../../../../services/common/pincode.service';
import { Router } from '@angular/router';
import { ShopregisterService } from '../../../../services/shopregister/shopregister.service';
import { ImageService } from '../../../../services/common/image.service';
import { UpdateShopService } from '../../../../services/updateShop/update-shop.service';
import { DeleteShopService } from '../../../../services/deleteShop/delete-shop.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cookie } from 'ng2-cookies';
import Swal from 'sweetalert2';
import { RequestAgainService } from '../../../../services/requestAgain/request-again.service';
import { log } from 'console';

interface Location {
  city: string;
  district: string;
  state: string;
}

@Component({
  selector: 'app-request-again',
  templateUrl: './request-again.component.html',
  styleUrl: './request-again.component.css'
})
export class RequestAgainComponent implements OnInit {
  //------------------CONSTRUCTOR---------------------------------------------------------
  constructor(
    private fetchshopInfo: FetchshopInfoService,
    private postalCodeService: PincodeService,
    private router: Router,
    private shopregisterService: ShopregisterService,
    private upload: ImageService,
    private requestagain : RequestAgainService
  ) {}

  // --------------------------------------------------------------------------------------

  cities: Location[] = [];
  file: any;


  licenceCNF:boolean = false;

  licenceFile: any;
  licenceName: string='';

  register = new FormGroup({
    userId: new FormControl(Cookie.get('userId')),
    shopName: new FormControl('', Validators.required),
    licenceNo: new FormControl('', Validators.required),
    licenceDocument: new FormControl(''),
    shopEmail: new FormControl('', Validators.required),
    shopContactNo: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    landmark: new FormControl('', Validators.required),
    pincode: new FormControl('', Validators.required),
    shopCity: new FormControl('', Validators.required),
    district: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),

    shopId: new FormControl(localStorage.getItem('shopId')),
    // country: new FormControl('',Validators.required),
  });

  goBack() {
    localStorage.removeItem('shopId');

    window.history.back();
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

  updateShopDetails() {
    // alert('values comes');
    console.log('On submit', this.register.value);

    this.register.value.licenceDocument= 'licence_'+this.register.value.shopContactNo+'.jpg';

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

    //if everything is okey then call the service method
    console.log('API CAlling', this.register.value);
    this.requestagain.refactorShop(this.register.value).subscribe(
      (response: any) => {
        console.log('Response from server : ', response);

        //and Navigate to the login page
        this.router.navigate(['/shopkeeper/view-shop']);
      },
      (error: any) => {
        console.log(error)
        Swal.fire({
          title: 'Oops',
          text: 'Caught an Error',
          icon: 'error',
        });
      }
    );

    // creating formdata to send image to backend for storing in folder structure
    let formData = new FormData();

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


  }

  //-----------------Validations-------------------------------------
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
  shopName: string | null = '';
  pincode: string | null = '';
  state: string | null = '';
  district: string | null = '';
  landmark: string | null = '';
  address: string | null = '';
  licenceNo: string | null = '';
  shopStatus: string | null = '';
  shopEmail: string | null = '';
  shopContactNo: string | null = '';
  shopCity: string | null = '';
  shopId: string = '';

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
  ngOnInit(): void {
    this.fetchshopInfo
      .fetchshopInfo(localStorage.getItem('shopEmail'))
      .subscribe((data: any) => {
        this.shopName = data.shopName;
        this.pincode = data.pincode;
        this.state = data.state;
        this.district = data.district;
        this.landmark = data.landmark;
        this.address = data.address;
        this.licenceNo = data.licenceNo;
        this.shopStatus = data.shopStatus;
        this.shopEmail = data.shopEmail;
        this.shopContactNo = data.shopContactNo;
        this.shopCity = data.shopCity;
        this.shopId = data.shopId;
        console.log('From Over Init', data);
        localStorage.setItem('shopId', this.shopId);
      });
    this.fetchshopInfo
      .fetchshopInfo(localStorage.getItem('shopEmail'))
      .subscribe((data: any) => {
        this.register.patchValue(data); // Patch form values with fetched data
        console.log('From Init', this.register.value);
      });
  }

  searchByPincode(data: string) {
    console.log('Inside method' + data);
    this.onPincodeChange(data);
  }
}
