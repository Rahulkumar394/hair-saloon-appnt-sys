import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { RegisterService } from '../services/register/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  register = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    contactNumber: new FormControl(''),
    gender: new FormControl(''),
    role: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.register = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      contactNumber: [''],
      gender: ['male'], // Set the default value for gender
      role: ['customer'], // Set the default value for role
      password: [''],
      confirmPassword: [''],
    });
  }

  //Validate the data of the form and send the data to the service
  doSubmit() {
    // alert('values comes');
    console.log(this.register.value);

    //check first name and last name
    let message = this.validateName(
      this.register.value.firstName,
      this.register.value.lastName
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
    message = this.validateEmail(this.register.value.email);

    if (message != '') {
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
      });
      return;
    }

    //check contact number
    message = this.validateContactNumber(this.register.value.contactNumber);

    if (message != '') {
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
      });
      return;
    }

    message = this.checkPassword(
      this.register.value.password,
      this.register.value.confirmPassword
    );

    if (message != '') {
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
      });
      return;
    }

    //if everything is okey then call the service method
    this.registerService.registerUser(this.register.value).subscribe(
      (response) => {
        console.log('Response from server : ', response);
        Swal.fire({
          title: 'Register Successfully!!',
          text: 'You can login now',
          icon: 'success',
        });

        //and Navigate to the login page
        this.router.navigate(['/login']);
      },
      // if any  error occured while registering user
      (error) => {
        Swal.fire({
          title: 'Server Error',
          text: 'There is something wrong please try again',
          icon: 'success',
        });
      }
    );
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
    if(!emailRegex.test(email)){
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

  checkPassword(password: any, confirmPassword: any): string {
    let message = '';

    //check the password empty or not
    if (!password || !confirmPassword) {
      message = 'Both fields are required.';
      return message;
    }

    // Check if the password and retype password match
    if (password !== confirmPassword) {
      message = 'Passwords do not match.';
      return message;
    }

    // Check if the password is between 8 to 16 characters
    if (password.length < 8 || confirmPassword.length > 16) {
      message = 'Password must be between 8 to 16 characters.';
      return message;
    }

    // If all validations pass
    return message; // Return an empty string indicating success
  }
}
