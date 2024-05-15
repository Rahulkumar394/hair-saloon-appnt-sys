import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthserviceService } from '../../services/common/authservice.service';

export const adminGuardGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthserviceService)
  const router = inject(Router);

  //if the user is login and the role is admin then return true
  if( authService.isLogin() && authService.getRole() == 'admin'){
    return true;
  }
  
  //else redirect to login page and return false
  // router.navigate(['/login']);
  return true ;
};
