import { Component, OnInit } from '@angular/core';
import { GetBookingDetailsService } from '../../../../services/booking-details/get-booking-details.service';
import { Cookie } from 'ng2-cookies';
import { error } from 'console';

interface booking{
  shopName: string,
  shopAddress: string,
  orderId: string,
  amount: number,
  date: string,
  time: string,
  serviceName:string,
}

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})


export class BookingDetailsComponent implements OnInit {

  public bookings: booking[]= [];

  constructor(private bookingDetails: GetBookingDetailsService){}

  ngOnInit(): void {
    localStorage.clear();
    const userId = Cookie.get('userId');
    console.log(userId);
    this.bookingDetails.getBookingDetails(userId).subscribe((data:any)=>{
      console.log(data);
      this.bookings = data;
    },
    error=>{
        alert("error Occured");
        console.log(error);
    });
  }

}
