import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GetServiceInfoService } from '../../../../services/fetchShopServices/get-service-info.service';
import { ViewShopServicesService } from '../../../../services/customer/view-shop-services.service';

// Define the Service interface
interface Service {
  serviceName: string;
  type: string;
  servicePrice: number;
  serviceDuration: number;
  description: string;
  imageUrl: string;
}

interface ImageMap {
  [imageName: string]: string;
}

@Component({
  selector: 'app-add-service-to-card',
  templateUrl: './add-service-to-card.component.html',
  styleUrl: './add-service-to-card.component.css',
})
export class AddServiceToCardComponent implements OnInit {

  public imagePaths: ImageMap= {
    "Hair Coloring": "../../../../../../assets/images/haircoloring.jpg",
    "Haircut": "../../../../../../assets/images/haircut.jpg",
    "Facial Cleansing": "../../../../../../assets/images/fecialcleanup.jpg",
    "Hair Wash": "../../../../../../assets/images/hairwash.jpg",
    "Massage": "../../../../../../assets/images/massage.jpg"
};
  // Define the services array using the Service interface
  services: Service[] = [];

  serviceCountMap: Map<Service, number> = new Map<Service, number>();
  
  totalAmount: number = 0;

  totalDuration: number = 0;

  serviceName: string = '';

  shopName: string|null = localStorage.getItem('shopName');

  shopAddress: string|null = localStorage.getItem('shopAddress');


  constructor(private router:Router, private getShopServices:ViewShopServicesService) {}
  ngOnInit(): void {

    //first check the customer already choose the service then naviage to the view slots page
    // if(localStorage.getItem('serviceTime') != null && localStorage.getItem('serviceName') != null && localStorage.getItem('serviceCharge')!=null && localStorage.getItem('shopName') != null){
    //   this.router.navigate(['/customer/view-slots']);
    // }

    if(localStorage.getItem('shopId')==null){
      this.router.navigate(['/customer/view-shops'])
    }
    this.getShopServices.fetchAllServices(localStorage.getItem('shopId')).subscribe((response: any) => {
      
      this.services = response;
      console.log(response);
      
    });
  }

  addToCart(service: Service) {
    // Print the data of the selected service to the console
    console.log(service);
  
    // Get the current count of the service from the map
    const count = this.serviceCountMap.get(service);
  
    // If the service is already in the map, increment its count
    if (count !== undefined) {
      this.serviceCountMap.set(service, count + 1);
    } else {
      // If the service is not in the map, add it with a count of 1
      this.serviceCountMap.set(service, 1);
    }
  
    // Increment the total amount
    this.totalAmount += service.servicePrice;
    this.totalDuration += service.serviceDuration;
    this.serviceName += service.serviceName + ', ';
  }

  removeItem(product: Service) {
    // Decrease the count of the service in the map
    if (this.serviceCountMap.has(product)) {
      const count = this.serviceCountMap.get(product);
      if (count != undefined && count>1) {
        this.serviceCountMap.set(product, count - 1);
      } else {
        this.serviceCountMap.delete(product);
      }
    }
    this.totalAmount -= product.servicePrice;
    this.totalDuration -= product.serviceDuration;
  }

  addItem(product: Service) {

    const count = this.serviceCountMap.get(product);

    // Increase the count of the service in the map
    if (this.serviceCountMap.has(product) && count!=undefined) {
      this.serviceCountMap.set(product, count + 1);
    } else {
      this.serviceCountMap.set(product, 1);
    }

    this.totalAmount += product.servicePrice;
    this.totalDuration += product.serviceDuration;
  }

  viewSlots(){
    if(this.totalDuration == 0 || this.totalAmount == 0){
      Swal.fire({
        title: 'Sorry',
        text: 'You have not choose any service at',
        icon: 'warning'
      });
      return ;
    }
    else{
      localStorage.setItem('serviceTime',''+this.totalDuration);
      localStorage.setItem('serviceName', this.serviceName);
      localStorage.setItem('serviceCharge',''+this.totalAmount);
      this.router.navigate(['/customer/view-slots']);
    }
  }

}
