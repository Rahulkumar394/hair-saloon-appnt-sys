import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageService } from '../../../../services/common/image.service';
import { DeleteShopService } from '../../../../services/deleteShop/delete-shop.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cookie } from 'ng2-cookies';
import Swal from 'sweetalert2';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UpdateEmployeeService } from '../../../../services/updateEmployee/update-employee.service';
import { FetchEmpInfoService } from '../../../../services/fetchEmployeeInfo/fetch-emp-info.service';
import { GetServiceInfoService } from '../../../../services/fetchShopServices/get-service-info.service';
import { DeleteEmployeeService } from '../../../../services/deleteEmployee/delete-employee.service';

interface Location {
  city: string;
  district: string;
  state: string;
}

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent implements OnInit {
  //------------------CONSTRUCTOR---------------------------------------------------------
  constructor(
    private fetchShopServices:GetServiceInfoService,
    private fetchEmpInfo: FetchEmpInfoService,
    private router: Router,
    private updateemployee: UpdateEmployeeService,
    private deleteEmployeeService: DeleteEmployeeService
  ) {}

  // --------------------------------------------------------------------------------------

  dropdownList: any = [];
  selectedList :any = [];
  dropdownSettings: IDropdownSettings = 
  {
    singleSelection: false,
    idField: 'ServiceId',
    textField: 'serviceName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true
  };

  EmpRegister = new FormGroup({
    shopId: new FormControl(localStorage.getItem('shopId')),
    employeeName: new FormControl(''),
    email: new FormControl(''),
    contactNumber: new FormControl(''),
    salary: new FormControl(''),
    gender: new FormControl(''),
    services: new FormControl(this.selectedList),
    address: new FormControl(''),
    employeeId:new FormControl(localStorage.getItem('employeeId'))
  });

  onItemSelect(item: any) {
    console.log('Selected Item:', item);
  }

  onSelectAll(items: any) {
    console.log('Selected All Items:', items);
  }
  goBack() {
    localStorage.removeItem('employeeId');

    window.history.back();
  }

  updateEmployeeDetails() {
    // alert('values comes');
    console.log('On submit', this.EmpRegister.value);

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

    if (message != '') {
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
      });
      return;
    }

    //if everything is okey then call the service method
    console.log('API CAlling', this.EmpRegister.value);
    this.updateemployee.updateEmployee(this.EmpRegister.value).subscribe(
      (response: any) => {
        console.log('Response from server : ', response);

        //and Navigate to the login page
        this.router.navigate(['/shopkeeper/shopDashboard']);
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
  }

  deleteEmployee() {
    Swal.fire({
      title: 'Are you sure you want to delete this employee?',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmDeleteEmployee();
      }
    });
  }

  confirmDeleteEmployee() {
    this.deleteEmployeeService.deleteEmployee(localStorage.getItem('employeeId')).subscribe(
      (data: any) => {
        // Handle successful deletion
        Swal.fire('Employee deleted!', '', 'success');
        this.router.navigate(['/shopkeeper/shopDashboard']);
      },
      (error) => {
        // Handle error
        Swal.fire('Error', 'Failed to delete the employee', 'error');
      }
    );
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

  employeeName: string | null = '';
  email: string | null = '';
  contactNumber: string | null = '';
  salary: string | null = '';
  gender: string | null = '';
  services: string | null = '';
  address: string | null = '';
  employeeId: string = '';

  ngOnInit(): void {
    
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

    this.fetchEmpInfo
      .fetchEmpInfo(localStorage.getItem('employeeId'))
      .subscribe((data: any) => {
        this.employeeName = data.employeeName;
        this.email = data.email;
        this.contactNumber = data.contactNumber;
        this.salary = data.salary;
        this.gender = data.gender;
        this.services = data.services;
        this.address = data.address;
        this.employeeId=data.employeeId;
        console.log('From Over Init', data);
        localStorage.setItem('employeeId', this.employeeId);

        this.selectedList = Object.keys(data.services).map(key => ({
          serviceId: key, // Assuming key is the service identifier
          serviceName: data[key] // Assuming data[key] holds the service name
        })); 
  
      });
        this.dropdownSettings = {
        idField: 'serviceId',
        textField: 'serviceName',
      };
      
      this.fetchEmpInfo
      .fetchEmpInfo(localStorage.getItem('employeeId'))
      .subscribe((data: any) => {
        this.EmpRegister.patchValue(data); // Patch form values with fetched data
        console.log('From Init', this.EmpRegister.value);
      });
  }

}
