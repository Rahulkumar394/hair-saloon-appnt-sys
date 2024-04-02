import { Component } from '@angular/core';
import {
  NgbCalendar,
  NgbDate,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { SlotService } from '../../../../services/slots/slot.service';
import { response } from 'express';
import { BookSlotService } from '../../../../services/slot-booking/book-slot.service';
import Swal from 'sweetalert2';

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
    private slotBooking: BookSlotService
  ) {
    this.selectedDate = this.minDate = this.getTodayDate();
    console.log(this.selectedDate);
    this.maxDate = this.getMaxDate();
    this.info.date = this.dateFormate(this.selectedDate);
    console.log(this.info);
    this.getSlots();
  }

  getSlots() {
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
    return this.formatDate(today);
  }

  formatDate(date: NgbDateStruct): string {
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
    console.log(slotTime);
    console.log(empId);
    console.log(localStorage.getItem('serviceName'));
    console.log(localStorage.getItem('serviceTime'));
    console.log(this.selectedDate);

    const slotInfo = {
      // Correct declaration with object literal {}
      slotTime: slotTime, // Use : for assignment
      empId: empId, // Use : for assignment
      serviceName: localStorage.getItem('serviceName'), // Get value from localStorage
      serviceTime: localStorage.getItem('serviceTime'), // Get value from localStorage
      date: this.selectedDate,
    };

    this.slotBooking.bookSlot(slotInfo).subscribe(
      (response: any) => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Your slot has been booked.',
        });
        this.getSlots();
      },
      (error) => {
        alert('error occurred');
      }
    );
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
}
