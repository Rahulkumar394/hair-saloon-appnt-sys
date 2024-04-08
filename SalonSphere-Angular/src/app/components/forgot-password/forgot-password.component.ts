import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ForgetPasswordService } from '../services/forgetPassword/forget-password.service';
import { response } from 'express';
import Swal from 'sweetalert2';
import { timer } from 'rxjs';
import { error } from 'console';
import { Cookie } from 'ng2-cookies';
import { Router } from '@angular/router';

interface otp {
  OTP: String;
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  forgetPassword = new FormGroup({
    email: new FormControl(''),
    otpclient: new FormControl(''),
    newPassword: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  obj: any;

  form1: boolean = true;
  form2: boolean = false;

  disabled: boolean = false;
  remainingTime: number = 60;

  otp: string = '';

  constructor(private forgetPass: ForgetPasswordService, private router:Router) { }

  sendOTP() {
    this.forgetPass.sendOTP(this.forgetPassword.value.email).subscribe(
      (response: any) => {
        console.log('Response from server : ', response);
        this.otp = response;

        this.disabled = true;
        const countdown = timer(1000, 1000).subscribe(() => {
          if (this.remainingTime > 0) {
            this.remainingTime--;
          } else {
            this.disabled = false;
            this.remainingTime = 60;
            countdown.unsubscribe();
          }
        });
      },
      (error: any) => {
        console.log('Error in sending otp:', error);
        Swal.fire({
          title: 'Oops',
          text: 'User Not Found..',
          icon: 'error',
        });
      }
    );
  }

  verifyOTP() {
    if (this.otp == this.forgetPassword.value.otpclient) {
      this.form1 = false;
      this.form2 = true;
    }
    else{
      Swal.fire({
        title: 'Error!',
        text: 'Wrong OTP.',
        icon: 'error',
      });
    }
  }

  setPassword() {
    let message = this.checkPassword(
      this.forgetPassword.value.newPassword,
      this.forgetPassword.value.confirmPassword
    );

    if (message != '') {
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
      });
      return;
    }
    // if(this.setPwd.value.newPassword===this.setPwd.value.confirmPassword){

    this.forgetPass
      .setPassword(
        this.forgetPassword.value.email,
        this.forgetPassword.value.newPassword
      )
      .subscribe((response: any) => {
        console.log(this.forgetPassword);
        console.log(response);
        this.afterSetRedirect();
      }),
      (error: any) => {
        console.log('this is error while setting password', error);
      };
    // }
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

  afterSetRedirect(){
    const role = Cookie.get('role');

    if(Cookie.get('role')){
      this.router.navigateByUrl(`/${role}`);
    }
    else{
      this.router.navigateByUrl('/login');
    }
  }
}
