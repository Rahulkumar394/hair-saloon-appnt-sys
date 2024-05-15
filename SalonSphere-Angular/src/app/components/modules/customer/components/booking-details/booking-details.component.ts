import { Component, OnInit } from '@angular/core';
import { GetBookingDetailsService } from '../../../../services/booking-details/get-booking-details.service';
import { Cookie } from 'ng2-cookies';
import { error } from 'console';
import Swal from 'sweetalert2';
import { AddFeedbackService } from '../../../../services/feedback/add-feedback.service';
import { CancelBookingService } from '../../../../services/cancel-booking/cancel-booking.service';

interface booking {
  shopName: string;
  shopAddress: string;
  orderId: string;
  amount: number;
  date: string;
  time: string;
  serviceName: string;
  status: string;
  empId: string;
  empName: string;
  shopId: string;
}

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css',
})
export class BookingDetailsComponent implements OnInit {
  public bookings: booking[] = [];

  constructor(private bookingDetails: GetBookingDetailsService, private feedback:AddFeedbackService, private cancelBooking:CancelBookingService) {}

  //create object for sending the review and reting information to the service
   obj:any = {
    reviewMessage: "",
    customerName: Cookie.get('name'),
    rating: "", // Corrected typo
    employeeName: "",
    employeeId: "",
    shopId: "",
    customerId: Cookie.get('userId')
 };

  ngOnInit(): void {

    localStorage.clear();
    this.getBookingDetails();
  }

  //method which get all the booking details
  public getBookingDetails(){
    const userId = Cookie.get('userId');
    this.bookingDetails.getBookingDetails(userId).subscribe(
      (data: any) => {
        console.log(data);
        this.bookings = data;
      },
      (error) => {
        alert('error Occured');
        console.log(error);
      }
    );
  }

  // according to the status change the color
  getStatusStyles(status: string): { [key: string]: string } {
    if (status === 'COMPLETED') {
      return { color: 'green' };
    } else {
      return { color: 'red' };
    }
  }

  //take the feedback to the customer
  navigateFeedback(booking: any) {

    this.obj.employeeId = booking.empId;
    this.obj.shopId = booking.shopId;
    this.obj.employeeName = booking.empName;
    let container = document.querySelector('.container');
    if (container) {
      container.classList.remove('disable');
    }
    console.log('hello user');
  }

  //teke the retting from the user
  getRetting(value: number) {
    const stars = document.querySelectorAll('.star');
    // Remove all existing classes from stars
    stars.forEach((s) =>
      s.classList.remove('one', 'two', 'three', 'four', 'five')
    );
    // Add the appropriate class to
    // each star based on the selected star's value
    stars.forEach((s, index) => {
      if (index < value) {
        s.classList.add(this.getStarColorClass(value));
      }
    });
    // Find the span element with id "rating"
    const ratingSpan = document.getElementById('rating');

    // Update the content of the span element with the rating value
    if (ratingSpan) {
      ratingSpan.textContent = value.toString();
    }
    localStorage.setItem('rating', '' + value);
  }

  //this give the color class
  getStarColorClass(value: any) {
    switch (value) {
      case 1:
        return 'one';
      case 2:
        return 'two';
      case 3:
        return 'three';
      case 4:
        return 'four';
      case 5:
        return 'five';
      default:
        return '';
    }
  }

  //send review in the database
  sendReview() {
    const messageElement = document.getElementById(
      'review'
    ) as HTMLTextAreaElement;
    const message = messageElement.value.trim();
    const rating = localStorage.getItem('rating');

    if (message && rating) {
      console.log(rating + ' ' + message);
      let container = document.querySelector('.container');
      if (container) {
        container.classList.add('disable');
      }
      this.obj.rating  = Number(rating);
      this.obj.reviewMessage= message;

      console.log(this.obj);

      //every this is fine then call the service 
      this.feedback.addFeedback(this.obj).subscribe((response:any)=>{
        //handle the success
        if(response.status==='success'){
          Swal.fire({
            icon: 'success',
            text: 'Your feedback has been sent successfully!',
            title: 'Successful!'
          });
        }
      },
      error=>{
        //handle the error
        alert("error occred by saving the feedback");
      })

    } else {
      alert('Please give the rating first.');
    }
  }

  closeContainer() {
    let container = document.querySelector('.container');
      if (container) {
        container.classList.add('disable');
      }
  }

  cancleBooking(booking:any) {
    console.log(booking);
    Swal.fire({
      title: "Are you sure?",
      text: "Do you Want to Cancel This Booking!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel !"
    }).then((result) => {

      //if confirmation is done then call the logout service
      if (result.isConfirmed) {
        //call the service method to cancel the booking
        this.cancelBooking.cancelBooking(booking.bookingId).subscribe((response:any)=>{
            console.log(response);
            if(response.status=='success'){
              Swal.fire({
                icon: 'success',
                text: 'Your Booking has been Canceled Successfully!',
                title: 'Canceled'
              });
            }
            else{
              Swal.fire({
                icon: 'error',
                text: 'Sorry your  request cannot be processed at the moment!',
                title: 'Something is wrong'
              });
            }
            this.getBookingDetails();
        },
        (error)=>{
          console.log("error occured");
        });
      }

      //else do nothing
      else{
        return ;
      }
  });
}
}
