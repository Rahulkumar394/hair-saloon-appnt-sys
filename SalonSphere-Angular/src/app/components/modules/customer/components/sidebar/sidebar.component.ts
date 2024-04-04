import { Component } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import Swal from 'sweetalert2';
import { LogoutService } from '../../../../services/logout/logout.service';
import { Router } from '@angular/router';
import { DeleteUserService } from '../../../../services/deleteUser/delete-user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  deleteUser() {
    this.deleteUserService
      .deleteUser(Cookie.get('userId'))
      .subscribe((data: any) => {
        Swal.fire({
          title: 'Do you really want to delete account?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Delete !!!',
        }).then((result) => {
          //if confirmation is done then call the logout service
          if (result.isConfirmed) {
            this.logoutService.logout();
            this.router.navigate(['/login']);
          }
    
          //else do nothing
          else {
            return;
          }
        });
      });
  }

  constructor(
    private logoutService: LogoutService,
    private router: Router,
    private deleteUserService: DeleteUserService
  ) {}
  customerName: any = Cookie.get('name').split(' ')[0];

  viewBookings() {
    throw new Error('Method not implemented.');
  }
  navigateLogout() {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout !',
    }).then((result) => {
      //if confirmation is done then call the logout service
      if (result.isConfirmed) {
        this.logoutService.logout();
        this.router.navigate(['/login']);
      }

      //else do nothing
      else {
        return;
      }
    });
  }
}
