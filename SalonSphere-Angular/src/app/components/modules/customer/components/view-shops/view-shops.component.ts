import { Component, OnInit } from '@angular/core';
import { ShowShopsService } from '../../../../services/customer/show-shops.service';

import Swal from 'sweetalert2';
import { FetchshopInfoService } from '../../../../services/fetchshopInfo/fetchshop-info.service';
import { Router } from '@angular/router';


interface shop {
  shopName: string;
  location: string;
  coverImage: string;
  timeDuration: string;
  price: number;
  rating:any;
  shopId:any;
  shopTiming:string;
  shopEmail:string;
}
@Component({
  selector: 'app-view-shops',
  templateUrl: './view-shops.component.html',
  styleUrl: './view-shops.component.css',
})
export class ViewShopsComponent implements OnInit {
  constructor(private customerService: ShowShopsService, private router:Router) {}

  //variable which track the dropdown lists
  serviceName:any = null;
  range:any = null;
  distance:any = null;
  city:any = localStorage.getItem('location');


  public shops: shop[] = [];

  //show the list of the shop on besis of the city when ever the page will load
  ngOnInit(): void {

    //first check if the customer inforamation already  present or not 
    // if(localStorage.getItem("shopId") !=null && localStorage.getItem('shopTiming') !=null && localStorage.getItem('shopName') !=null && localStorage.getItem('shopAddress') !=null ){
    //     this.router.navigate(['/customer/add-service-to-card']);
    // }


    if(localStorage.getItem('location')==null){
    setTimeout(() => {
      this.city = localStorage.getItem('location');
       this.showShopByCity(this.city);
    }, 4000);
    }
    else {
      this.city = localStorage.getItem('location');
       this.showShopByCity(this.city);
    }
    
  }

  getShopId(shopId:any,shopName:any,shopTiming:any,shopEmail:any){
    localStorage.setItem('shopId',shopId);
    localStorage.setItem('shopName',shopName);
    localStorage.setItem('shopTiming',shopTiming);
    localStorage.setItem('shopEmail',shopEmail);

  }

  //call the service method and get all the shops by using city
  public showShopByCity(location: any) {
    this.customerService.showShopsByCity(location).subscribe(
      (response: any) => {
        console.log(response);
        if (response == null) {
          Swal.fire({
            title: 'Not Found',
            text: 'There is no any shop in this city',
            icon: 'error',
          });
        } else {
          this.shops = response;
        }
      },
      (error) => {
        console.log('error occure');
      }
    );
  }

  //DOM Menuplation for Servive Dropdown
  showServiceDropdown() {

    const selected = document.querySelector('.service-selected');
    const optionsContainer = document.querySelector('.service');
    const optionsList = document.querySelectorAll('.service-option');

    if (selected && optionsContainer)
      optionsList.forEach((o) => {
        o.addEventListener('click', () => {
          const lebel = o.querySelector('label');
          if (lebel) {
            selected.innerHTML = lebel.innerHTML;
            this.serviceName = lebel.innerHTML;
          }
          optionsContainer.classList.remove('active');

          //call the dropdownFilter method which filter the shop by using service Name
          this.dropdownFilter(this.serviceName, this.range, this.distance,this.city);

          setTimeout(() => {
            optionsContainer.classList.add('active');
          }, 1000);
        });
      });
  }

  //DOM Menuplation for range Dropdown
  showrangeDropdown() {

    const selected = document.querySelector('.range-selected');
    const optionsContainer = document.querySelector('.range');
    const optionsList = document.querySelectorAll('.range-option');

    if (selected && optionsContainer)
      optionsList.forEach((o) => {
        console.log('aman');
        o.addEventListener('click', () => {
          const lebel = o.querySelector('label');
          if (lebel) {
            selected.innerHTML = lebel.innerHTML;
            this.range = lebel.innerHTML;
          }
          optionsContainer.classList.remove('active');

          //call the dropdownFilter method which filter the shop by using range
          this.dropdownFilter(this.serviceName, this.range, this.distance, this.city);

          setTimeout(() => {
            optionsContainer.classList.add('active');
          }, 1000);
        });
      });
  }

  //DOM menuplation for distance Dropdown
  showdistanceDropdown() {

    const selected = document.querySelector('.distance-selected');
    const optionsContainer = document.querySelector('.distance');
    const optionsList = document.querySelectorAll('.distance-option');

    if (selected && optionsContainer)
      optionsList.forEach((o) => {
        console.log('aman');
        o.addEventListener('click', () => {
          const lebel = o.querySelector('label');
          if (lebel) {
            selected.innerHTML = lebel.innerHTML;
            this.distance= lebel.innerHTML;
          }
          optionsContainer.classList.remove('active');

          
          //call the dropdownFilter method which filter the shop by using distance
          this.dropdownFilter(this.serviceName, this.range, this.distance, this.city);

          setTimeout(() => {
            optionsContainer.classList.add('active');
          }, 1000);
        });
      });
  }
  dropdownFilter(serviceName: any, range: any, distance: any, city: any) {
    this.customerService.filterShops(serviceName, range, distance, city).subscribe(
      (response: any) => {
        console.log(response);
        console.log("Aman Bhai")
        if (!response || response.length === 0) {
          this.shops = [];
        } else {
          this.shops = response;
        }
      },
      (error) => {
        console.log("Error occurred");
      }
    );
  }
  
  navigate(s:shop){

    localStorage.setItem('shopId',s.shopId );
    localStorage.setItem('shopTiming', s.shopTiming);
    localStorage.setItem('shopName', s.shopName);
    localStorage.setItem('shopAddress',s.location);

    this.router.navigate(['/customer/add-service-to-card']);
  }
}
