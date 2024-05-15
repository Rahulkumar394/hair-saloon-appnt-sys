import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LogoutService } from '../../../../services/logout/logout.service';
import { ToggleService } from '../../../../services/toggle.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  flag: boolean = false;

  constructor(private router: Router, private logoutService: LogoutService, private toggleService:ToggleService) {}

  public navigateViewUsers() {
    //add the active class
    this.addActiveClass('view-user');

    this.router.navigate(['/admin/view-user']);
  }

  public navigateViewRequests() {
    //add the active class
    this.addActiveClass('view-request');

    this.router.navigate(['/admin/view-request']);
  }

  public navigateHome() {
    //add the active class
    this.addActiveClass('home');

    this.router.navigate(['/admin/home']);
  }

  navigateManageShopkeeper() {
    //add the active class
    this.addActiveClass('manage-shopkeeper');

    this.router.navigate(['/admin/viewShopkeepers']);
  }

  navigateManageCustomer() {
    //add the active class
    this.addActiveClass('manage-customer');

    this.router.navigate(['/admin/viewCustomers']);
  }

  navigateAnalytics() {
    //add the active class
    this.addActiveClass('analytics');
  }

  public navigateLogout() {
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

  toggle() {
    let sidebar = document.querySelector('.sidebar') as HTMLElement;

    if (sidebar.classList.contains('close')) {
      sidebar.style.width = '280px';
      this.toggleService.setLeftMargin('280px')
      this.toggleService.setWidth('85%');
      sidebar.classList.remove('close');
    } else {
      sidebar.style.width = '100px';
      this.toggleService.setLeftMargin('100px');
      this.toggleService.setWidth('94%');
      sidebar.classList.add('close');
    }
  }

  //method which add the active class of the current link
  public addActiveClass(classsName: any) {
    //remove the active class
    const hover: NodeListOf<Element> = document.querySelectorAll('.common');
    hover.forEach((element) => {
      element.classList.remove('active');
    });

    //add the active class to current clicked button
    const active = document.querySelector('.' + classsName);
    active?.classList.add('active');
  }
}
