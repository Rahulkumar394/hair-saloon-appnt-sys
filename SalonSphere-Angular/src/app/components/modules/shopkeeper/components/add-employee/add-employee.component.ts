import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RegisterService } from '../../../../services/register/register.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AddEmployeeService } from '../../../../services/addEmployee/add-employee.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { GetshopService } from '../../../../services/getshop/getshop.service';
import { GetServiceInfoService } from '../../../../services/fetchShopServices/get-service-info.service';

interface shopData {
  shopName: string;
  shopEmail: string;
  createdDate: string;
}

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent implements OnInit {
  selectedServices: string[] = [];
  ServiceList: string[] = ['Service 1', 'Service 2', 'Service 3'];
  data!: FormArray<any>;

  EmpRegister = new FormGroup({
    shopId: new FormControl(localStorage.getItem('shopId')),
    employeeName: new FormControl(''),
    email: new FormControl(''),
    contactNumber: new FormControl(''),
    salary: new FormControl(''),
    gender: new FormControl(''),
    services: new FormControl(),
    address: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private addEmployeeService: AddEmployeeService,
    private fetchShopServices:GetServiceInfoService,

  ) {}

  dropdownList: any = [];
  dropdownSettings: IDropdownSettings = {};
  ngOnInit() {

    this.fetchShopServices.fetchShopServicesWithServiceId(localStorage.getItem('shopId')).subscribe((data:any)=>{

      console.log(data);
      this.dropdownList = Object.keys(data).map(key => ({
        serviceId: key, // Assuming key is the service identifier
        serviceName: data[key] // Assuming data[key] holds the service name
      }));

    })
    this.dropdownSettings = {
      idField: 'serviceId',
      textField: 'serviceName',
    };
  }

  //Validate the data of the form and send the data to the service
  doSubmit() {
    // alert('values comes');
    console.log(this.EmpRegister.value);

    //check first name and last name
    let message = this.validateName(this.EmpRegister.value.employeeName);

    if (message != '') {
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
      });
      return;
    }

    //Check email
    message = this.validateEmail(this.EmpRegister.value.email);

    if (message != '') {
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
      });
      return;
    }

    //check contact number
    message = this.validateContactNumber(this.EmpRegister.value.contactNumber);

    if (message != '') {
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
      });
      return;
    }

    //check salary
    message = this.validateSalary(this.EmpRegister.value.salary);

    if (message != '') {
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
      });
      return;
    }

    //check address
    message = this.validateAddress(this.EmpRegister.value.address);

    if (message != '') {
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
      });
      return;
    }

    this.addEmployeeService
      .addEmployee(this.EmpRegister.value)
      .subscribe((data: any) => {
        console.log(data);
        Swal.fire({
          title: 'Done',
          text: 'Employee Added Successfully',
          icon: 'success',
        }).then((result) => {
          if (result.isConfirmed) {
            // Navigate to the desired page
            this.router.navigate(['/shopkeeper/view-shop']);
          }
        });

      }),
      (error: any) => {
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: 'Error While Adding Employee',
          icon: 'error',
        });
      };
  }

  //Validate the name fields
  validateName(Name: any): string {
    let message = '';

    // Check if either of the fields is empty
    if (!Name) {
      message = 'Please enter the first name and last name';
      return message;
    }

    // Check if the first and last names contain at least two characters
    if (Name.length < 2) {
      message = 'Name must contain at least two characters each.';
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

  validateSalary(salary: any): string {
    let message = '';

    //check if the contactNumber is empty or not
    if (salary < 0) {
      message = 'Salary can not less than 0';
      return message;
    }

    // If  validations pass
    return message; // Return an empty string indicating success
  }

  //Validate the address fields
  validateAddress(address: any): string {
    let message = '';
    address = address.trim();

    // Check if either of the fields is emptyx`
    if (!address) {
      message = 'Please enter the address';
      return message;
    }

    // Check if the first and last names contain at least two characters
    if (address.length < 10) {
      message = 'Address must contain at least ten characters each.';
      return message;
    }

    const addressRegex = /^(?=.*[a-zA-Z])[\w\s.,-]*$/;
    if (!addressRegex.test(address)) {
      message = 'Please enter a valid address of employee.';
      return message;
    }

    // If all validations pass
    return message; // Return an empty string indicating success
  }
}
