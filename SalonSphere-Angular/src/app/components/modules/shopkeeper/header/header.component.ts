import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../../../services/logout/logout.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { profile } from 'console';
import { ShowShopOwnerService } from '../../../services/show-shop-owner/show-shop-owner.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  shopkeeperName: any = Cookie.get('name');
  profileImage: any = '';

  constructor(
    private router: Router,
    private logoutService: LogoutService,
    private showShopOwnerService: ShowShopOwnerService
  ) {}
  ngOnInit(): void {
    // Service Call for getting profilePicture name
    this.showShopOwnerService.getShopkeeper().subscribe((data: any) => {
       this.profileImage = data.profile;
    }),
      (error: any) => {
        console.log('this is header Error in shopkeeper module: ', error);
      };
  }

  public navigateLogout() {
    //remove the active class
    const hover: NodeListOf<Element> = document.querySelectorAll('.nav-option');
    hover.forEach((element) => {
      element.classList.remove('active');
    });

    //add the active class to current clicked button
    const home = document.querySelector('.option7');
    home?.classList.add('active');

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
