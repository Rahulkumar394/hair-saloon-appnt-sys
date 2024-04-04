import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthserviceService } from '../../services/common/authservice.service';
import Swal from 'sweetalert2';

export const customerGuardGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthserviceService)
  const router = inject(Router);

  //if the user is login and the role is cutomer then return true
  if( authService.isLogin() && authService.getRole() == 'customer'){
    return true;
  }

  Swal.fire({
    title: "You are not allowed!",
    text: "Please Login as Customer to access this feature.",
    icon: "warning",
  })
  
  //otherwise  redirect to login page and return false
  router.navigate(['/login']);
  return false;
};
