import { Component, OnInit } from '@angular/core';
import { ShowCustomerService } from '../../../../services/show-customer/show-customer.service';

interface customer {
  fullName: string;
  contactNumber: string;
  email: string;
}
@Component({
  selector: 'app-view-customers',
  templateUrl: './view-customers.component.html',
  styleUrl: './view-customers.component.css'
})
export class ViewCustomersComponent implements OnInit{

  constructor( private customerService: ShowCustomerService){}
  ngOnInit(): void {
    this.showCustomer();
  }

  public customers: customer[] = [];


  public showCustomer() {
    console.log('come inside the show Customer');

    //enable the spinner
    const spinner = document.querySelector('.spinner');
    spinner?.classList.remove('disable');

    this.customerService.getAllCustomers().subscribe(
      (response: any) => {
        //add and remove the disable class from the tables
        const customerTable = document.querySelector('.customer-table');
        const ownerTable = document.querySelector('.owner-table');
        customerTable?.classList.remove('disable');
        ownerTable?.classList.add('disable');
        console.log(response);
        this.customers = response;
        spinner?.classList.add('disable');
      },
      (error) => {
        spinner?.classList.add('disable');
        console.log('error occur' + error);
      }
    );
  }

}
