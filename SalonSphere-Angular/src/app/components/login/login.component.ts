import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login/login.service';
import { Cookie } from 'ng2-cookies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginData = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  passwordHidden: boolean = true;

  togglePasswordVisibility(): void {
    this.passwordHidden = !this.passwordHidden;
    const passwordInput = document.getElementById('passwordInput');
    if (passwordInput) {
      passwordInput.setAttribute('type', this.passwordHidden ? 'password' : 'text');
    }
  }
  
  

  constructor(private loginSevice: LoginService, private router: Router) {}
  doSubmit() {
    console.log('data come');
    console.log(this.loginData.value);

    //Check email
    let message = this.validateEmail(this.loginData.value.email);

    if (message != '') {
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
      });
      return;
    }

    //check password
    message = this.validataPassword(this.loginData.value.password);

    if (message != '') {
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
      });
      return;
    }

    //if everything is good then call the loginService
    this.loginSevice.loginUser(this.loginData.value).subscribe(
      (response) => {
        console.log(response);
        this.setToken(response);
        Swal.fire({
          title: 'Good Job!',
          text: 'Login Successfully',
          icon: 'success',
        });
      },
      (error) => {
        console.log('Error');
        Swal.fire({
          title: 'Server Error!',
          text: 'Some thing wrong in the server',
          icon: 'error',
        });
      }
    );
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

  //validate password
  validataPassword(pass: any): string {
    let message = '';

    if (!pass || pass.length < 6) {
      message += 'The Password must be at least 6 characters.\n';
    }
    return message;
  }

  setToken(response: any) {
    Cookie.set('token', response.jwtToken);
    Cookie.set('name', response.name);
    Cookie.set('role', response.role);
    Cookie.set('userId', response.userId);

    //according to the usertype or role navigate the corresponding deshborad
    if (response.role == 'admin') {
      this.router.navigate(['/admin']);
    } else if (response.role == 'shopkeeper') {
      this.router.navigate(['/shopkeeper']);
    } else {
      // Route the customer to view Shops near them
      this.router.navigate(['/customer/view-shops']);
    }
  }
}
