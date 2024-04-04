import { Component } from '@angular/core';
import {
  NgbCalendar,
  NgbDate,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { SlotService } from '../../../../services/slots/slot.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-view-slots',
  templateUrl: './view-slots.component.html',
  styleUrl: './view-slots.component.css',
})
export class ViewSlotsComponent {
  shopName: string | null = localStorage.getItem('shop_name');
  shopAddress: string | null = localStorage.getItem('location');

  selectedDate: string;
  minDate: string = '';
  maxDate: string = '';
  serviceCharge:number=0;
  serviceTime:number=0;
  serviceName:string='';

  public info = {
    shopId: localStorage.getItem('shopId'),
    shopTiming: localStorage.getItem('shopTiming'),
    serviceDuration: Number(localStorage.getItem('serviceTime')),
    date: '',
  };

  availableSlots: Map<string, string[]> = new Map<string, string[]>();

  constructor(
    private calendar: NgbCalendar,
    private slotService: SlotService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  
    if(localStorage.getItem('date')!=null){
      const date:any = localStorage.getItem('date')
      this.selectedDate = date;
      this.minDate = this.getTodayDate();
    }
    else{
    this.selectedDate = this.minDate = this.getTodayDate();
    }
    console.log(this.selectedDate);
    this.maxDate = this.getMaxDate();
    this.info.date = this.dateFormate(this.selectedDate);
    console.log(this.info);

    console.log("xxxxxx");
    this.route.paramMap.subscribe(params => {
      if (window.history.state.serviceTime && window.history.state.serviceName && window.history.state.serviceCharge) {
        this.serviceTime = window.history.state.serviceTime;
        this.serviceName = window.history.state.serviceName;
        this.serviceCharge = window.history.state.serviceCharge;
        console.log("Your data is " + this.serviceTime + ", " + this.serviceCharge + ", " + this.serviceName);
      }
    });
    this.getSlots();
  }

  getSlots() {
    //set the date which has choosen by the customer
    this.info.date = this.selectedDate;
    this.info.serviceDuration = this.serviceTime;

    // call the service which will give all the available slots
    this.slotService.getAllAvilableSlots(this.info).subscribe(
      (response: any) => {
        console.log('success');
        console.log(response);
        Object.keys(response).forEach((key) => {
          this.availableSlots.set(key, response[key]);
        });
      },
      (error) => {
        console.log('error occured' + error.message());
      }
    );
  }

  getTodayDate(): string {
    const today = this.calendar.getToday();
    console.log('aya haia aya ahai');
    return this.formatDate(today);
  }

  formatDate(date: NgbDateStruct): string {
    console.log('aya haia aya ahai333');
    return `${date.year}-${this.addLeadingZero(
      date.month
    )}-${this.addLeadingZero(date.day)}`;
  }

  addLeadingZero(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }

  getMaxDate(): string {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7); // Add 7 days
    return maxDate.toISOString().split('T')[0];
  }

  // Function to extract empId
  getEmpId(jsonData: string): string {
    const data = jsonData.split(',')[0]; // Split the string and get the first part
    return data.substring(1); // Remove the opening square bracket
  }

  // Function to extract name
  getName(jsonData: string): string {
    const data = jsonData.split(',')[1]; // Split the string and get the second part
    return data.trim().slice(0, -1); // Remove any leading/trailing whitespace and remove the closing square bracket
  }

  bookSlot(slotTime: any, empId: any) {
    // console.log(slotTime);
    // console.log(empId);
    // console.log(localStorage.getItem('serviceName'));
    // console.log(localStorage.getItem('serviceTime'));
    // console.log(this.selectedDate);
    // localStorage.setItem('slotTime', slotTime);
    localStorage.setItem('empId',empId);
    // localStorage.setItem('date', this.selectedDate);
    
    //navigate user to the payment section
    const navigationExtras: NavigationExtras = {
      state: {
        serviceTime: this.serviceTime,
        serviceName: this.serviceName,
        serviceCharge: this.serviceCharge,
        slotTime:slotTime,
        empId:empId,
        date:this.selectedDate,
      }
    };

    this.router.navigate(['/customer/payment-method'], navigationExtras);
  }

    
    

   dateFormate(dateString: string) {
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const [year, month, day] = parts;
      return `${day}-${month}-${year}`;
    } else {
      return 'Invalid date format';
    }
  }

  onDateSelected() {
    console.log(this.selectedDate);
    this.getSlots();
  }
}