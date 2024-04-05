import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ForgetPasswordService } from '../services/forgetPassword/forget-password.service';
import { response } from 'express';
import Swal from 'sweetalert2';

interface otp{
  OTP:String;
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  forgetPassword = new FormGroup({
    email: new FormControl('')
  });

  form1:boolean=true;
  form2:boolean=false;

  constructor(private forgetPass: ForgetPasswordService) {}

  sendOTP(){
    this.forgetPass.sendOTP(this.forgetPassword.value.email).subscribe(
      (response: any) => {
        console.log('Response from server : ', response);
      },
      (error: any) => {
        
        Swal.fire({
          title: 'Oops',
          text: 'Caught an Error to send OTP',
          icon: 'error',
        });
      }
    );
  }

  verifyOTP(){
    this.form1=false;
    this.form2=true;
  }

}
