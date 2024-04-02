import { Component, OnInit } from '@angular/core';
import { ShowShopsService } from '../../../../services/customer/show-shops.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';


interface shop {
  shopName: string;
  location: string;
  coverImage: string;
  timeDuration: string;
  price: number;
  shopId: string;
  shopTiming:string;
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
  renge:any = null;
  distence:any = null;
  city:any = localStorage.getItem('location');


  public shops: shop[] = [];

  //show the list of the shop on besis of the city when ever the page will load
  ngOnInit(): void {

    //first check if the customer inforamation already  present or not 
    // if(localStorage.getItem("shopId") !=null && localStorage.getItem('shopTiming') !=null && localStorage.getItem('shopName') !=null && localStorage.getItem('shopAddress') !=null ){
    //     this.router.navigate(['/customer/add-service-to-card']);
    // }


    this.city = localStorage.getItem('location');
    this.showShopByCity(this.city);
  }

  //call the service method and get all the shops by using city
  public showShopByCity(loction: any) {
    console.log("+++++++++++++++++++++++++"+loction);
    this.customerService.showShopsByCity(loction).subscribe(
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
          this.dropdownFilter(this.serviceName, this.renge, this.distence,this.city);

          setTimeout(() => {
            optionsContainer.classList.add('active');
          }, 1000);
        });
      });
  }

  //DOM Menuplation for Renge Dropdown
  showRengeDropdown() {

    const selected = document.querySelector('.renge-selected');
    const optionsContainer = document.querySelector('.renge');
    const optionsList = document.querySelectorAll('.renge-option');

    if (selected && optionsContainer)
      optionsList.forEach((o) => {
        console.log('aman');
        o.addEventListener('click', () => {
          const lebel = o.querySelector('label');
          if (lebel) {
            selected.innerHTML = lebel.innerHTML;
            this.renge = lebel.innerHTML;
          }
          optionsContainer.classList.remove('active');

          //call the dropdownFilter method which filter the shop by using Renge
          this.dropdownFilter(this.serviceName, this.renge, this.distence, this.city);

          setTimeout(() => {
            optionsContainer.classList.add('active');
          }, 1000);
        });
      });
  }

  //DOM menuplation for Distence Dropdown
  showDistenceDropdown() {

    const selected = document.querySelector('.distence-selected');
    const optionsContainer = document.querySelector('.distence');
    const optionsList = document.querySelectorAll('.distence-option');

    if (selected && optionsContainer)
      optionsList.forEach((o) => {
        console.log('aman');
        o.addEventListener('click', () => {
          const lebel = o.querySelector('label');
          if (lebel) {
            selected.innerHTML = lebel.innerHTML;
            this.distence= lebel.innerHTML;
          }
          optionsContainer.classList.remove('active');

          
          //call the dropdownFilter method which filter the shop by using distence
          this.dropdownFilter(this.serviceName, this.renge, this.distence, this.city);

          setTimeout(() => {
            optionsContainer.classList.add('active');
          }, 1000);
        });
      });
  }

  dropdownFilter(serviceName: any, renge: any, distence: any, city: any) {
    this.customerService.filterShops(serviceName, renge, distence, city).subscribe(
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
