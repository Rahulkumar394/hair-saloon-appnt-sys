import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../../../services/common/location.service';
import { response } from 'express';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchFilterService } from '../../../../services/common/search-filter.service';
import { error } from 'console';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  searchForm!: FormGroup;
  constructor(
    private locationService: LocationService,
    private formBuilder: FormBuilder,
    private searchShopService:SearchFilterService
  ) {}

  private customerCity: string = '';
  private customerCountry: string = '';
  shops:any[]=[];

  textSearch:boolean=false;

  ngOnInit(): void {
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


  showShops(){
    if(this.textSearch){
      this.textSearch = false;
    }else{
      this.textSearch = true;
    }
  }
}
