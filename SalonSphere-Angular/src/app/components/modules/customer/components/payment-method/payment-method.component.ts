import { Component, OnInit } from '@angular/core';
import internal from 'stream';
import { CreateOrderService } from '../../../../services/payment-integration/create-order.service';

import { error } from 'console';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { BookSlotService } from '../../../../services/slot-booking/book-slot.service';
import { SaveTransactionService } from '../../../../services/payment-integration/save-transaction.service';
import { Cookie } from 'ng2-cookies';

declare var Razorpay: any; // Declare Razorpay as a global variable

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrl: './payment-method.component.css',
})
export class PaymentMethodComponent implements OnInit {
  
  serviceCharge: number = 0;
  date: string = '';
  slotTiming: string = '';
  bookingId: string|null = '';
  serviceTime:string ='';
  serviceName:string = '';
  empId:string ='';



  constructor(
    private order: CreateOrderService,
    private router: Router,
    private slotBooking: BookSlotService,
    private saveTransaction: SaveTransactionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    if(localStorage.getItem('empId')==null){
      this.router.navigate(['/customer/view-shops']);
    }

    this.route.paramMap.subscribe(params => {
      if (window.history.state.serviceTime && window.history.state.serviceName && window.history.state.serviceCharge && window.history.state.empId && window.history.state.date) {
        this.serviceTime = window.history.state.serviceTime;
        this.serviceName = window.history.state.serviceName;
        this.serviceCharge = window.history.state.serviceCharge;
        this.date = window.history.state.date;
        this.empId=window.history.state.empId;
        this.slotTiming= window.history.state.slotTime;

        console.log("Your data is " + this.serviceTime + ", " + this.serviceCharge + ", " + this.serviceName +", "+ this.empId+", "+this.slotTiming+", "+this.date);
      }
    });
  }



  pay() {
    console.log(this.serviceCharge);
    //call the service mathod which will request to the server to create the order

    this.order.createNewOrder(this.serviceCharge).subscribe(
      (data: any) => {
        console.log(data);
        const options = {
          key: 'rzp_test_t5MFB53rHNJP1w', // Enter the Key ID generated from the Dashboard
          amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: 'INR',
          name: 'SalonSphere',
          description: 'Test Transaction',
          image: '../../../../../../assets/images/logo.png',
          order_id: data.id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1

          prefill: {
            name: '',
            email: '',
            contact: '',
          },
          notes: {
            address: 'Salon Sphere',
          },
          theme: {
            color: '#3399cc',
          },
          handler: (response: any) => {
            console.log(response.razorpay_payment_id);
            console.log(response.razorpay_order_id);
            console.log(response.razorpay_signature);

            // if the payment is successfully done then
            const slotInfo = {
             // Correct declaration with object literal {}
              slotTime: this.slotTiming,
              empId: this.empId, // Use : for assignment
              serviceName: this.serviceName, // Get value from localStorage
              serviceTime: this.serviceTime, // Get value from localStorage
              date: this.date,
            };
        
            //call the service method to book the slot
            this.slotBooking.bookSlot(slotInfo).subscribe(
              (response: any) => {
                console.log(response);
                this.bookingId = response.status;
                Swal.fire({
                  icon: 'success',
                  title: 'Slot Booked',
                  text: 'Your slot has been booked.',
                });
                this.saveTransactionDetails(data.id, data.amount,response.razorpay_payment_id, response.razorpay_signature );
              },
              (error) => {
                alert('error occurred');
              }
            );
          },
        };

        const rzp = new Razorpay(options);

        rzp.on('payment.failed', (response: any) => {
          Swal.fire({
            title: 'Plear Try Again',
            text: 'There is Somethig Wrong',
            icon: 'error',
          });
        });
        rzp.open();
      },
      (error) => {
        alert('error occured' + error);
      }
    );
  }

  saveTransactionDetails(id:string, amount:string, paymentId:string, signature: string){

    //create object to save the transactional detail from the database
    console.log("booking id is"+this.bookingId);
    const obj = {
      orderId: id,
      amount: amount,
      paymentId: paymentId,
      paymentSignature: signature,
      userId: Cookie.get('userId'),
      bookingId: this.bookingId,
    }

    console.log("object details ------- "+obj);
    //call the service method which will save the transactional details of the customer
    this.saveTransaction.saveTransaction(obj).subscribe((data:any)=>{
        console.log(data);
    })

    //then navigate to booking detials
    this.router.navigate(['/customer/booking-details']);
  }

}
