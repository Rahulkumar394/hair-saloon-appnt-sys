import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../../../services/common/location.service';
import { response } from 'express';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchFilterService } from '../../../../services/common/search-filter.service';
import { error } from 'console';
import { Cookie } from 'ng2-cookies';
import Swal from 'sweetalert2';
import { LogoutService } from '../../../../services/logout/logout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  searchForm!: FormGroup;
  isLogin!: boolean;
  profilePicture!:boolean;
  constructor(
    private locationService: LocationService,
    private formBuilder: FormBuilder,
    private searchShopService: SearchFilterService,
    private logoutService:LogoutService,
    private router:Router
  ) {}

  private customerCity: string = '';
  private customerCountry: string = '';
  shops: any[] = [];

  textSearch: boolean = false;

  ngOnInit(): void {
    
    if (!Cookie.get('role')) 
      this.isLogin = false;
    else 
      this.isLogin = true
      this.searchForm = this.formBuilder.group({
      keyword: [''], // Set initial value for keyword
    });

    //call location service which give the user current location
    this.locationService.getLocation().subscribe((response: any) => {
      this.customerCity = response.city;
      this.customerCountry = response.country_name;

      //save the location in local storage also
      localStorage.setItem('location', this.customerCity);

      const option = document.createElement('option');
      option.textContent = this.customerCity + ', ' + this.customerCountry;
      const dropDown = document.querySelector('.dropdown');

      //remove the all the options from the dropdown
      while (dropDown?.firstChild) {
        dropDown?.firstChild.remove();
      }

      //add current location of the customer in dropdown
      dropDown?.appendChild(option);
      console.log(this.customerCity);
    });
  }

  searchFilter(keyword: any): void {
    const searchTerm = keyword.value.trim(); // Remove leading/trailing whitespace
    if (searchTerm !== '') {
      this.textSearch = true; // Show search results
      this.searchShopService.searchShops(searchTerm).subscribe(
        (shopList: any) => {
          console.log(shopList);
          this.shops = shopList;
        },
        (error: any) => {
          console.log('Search Error', error);
        }
      );
    } else {
      this.textSearch = false; // Hide search results if search term is empty
      this.shops = []; // Clear search results
    }
  }

  shopInfo(shopId: any, shopName: any, shopTiming: any, shopEmail: any) {}


  navigateLogout(){
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

