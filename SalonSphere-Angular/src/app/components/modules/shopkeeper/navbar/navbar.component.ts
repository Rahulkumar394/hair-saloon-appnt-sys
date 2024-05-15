import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LogoutService } from '../../../services/logout/logout.service';
import { Cookie } from 'ng2-cookies';
import { ToggleService } from '../../../services/toggle.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  shopkeeperName: any = Cookie.get('name').split(' ')[0];
  flag = false;

  constructor(private router: Router, private logoutService: LogoutService, private toggleService:ToggleService) {}

  public navigateAddShop() {
    //add the active class
    this.addActiveClass('add-shop');

    this.router.navigate(['/shopkeeper/add-shop']);
  }

  navigateAnalytics() {
    //add the active class
    this.addActiveClass("analytics");

  }

  navigateManageBookings() {
    //add the active class
    this.addActiveClass('manage-booking');


  }

  public navigateViewShop() {

    //add the active class
    this.addActiveClass('view-shop');
    
    this.router.navigate(['/shopkeeper/view-shop']);
  }

  public navigateHome() {
    //add the active class
    this.addActiveClass('home');
    this.router.navigate(['/shopkeeper/home']);
  }

  //method which add the active class of the current link
  public addActiveClass(classsName:any) {
       //remove the active class
    const hover: NodeListOf<Element> = document.querySelectorAll('.common');
    hover.forEach((element) => {
      element.classList.remove('active');
    });

    //add the active class to current clicked button
    const active = document.querySelector('.'+classsName);
    active?.classList.add('active');
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
      sidebar.style.width = '290px';
      this.toggleService.setLeftMargin('290px');
      this.toggleService.setWidth('86%');
      sidebar.classList.remove('close');
    } else {
      sidebar.style.width = '100px';
      this.toggleService.setLeftMargin('100px');
      this.toggleService.setWidth('94%');
      sidebar.classList.add('close');
    }
  }
}
