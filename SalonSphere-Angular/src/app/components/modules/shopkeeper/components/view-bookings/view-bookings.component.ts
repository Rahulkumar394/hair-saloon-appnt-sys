import { Component, OnInit } from '@angular/core';
import { FetchBookedSlotsService } from '../../../../services/fetchBookedSlots/fetch-booked-slots.service';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrl: './view-bookings.component.css',
})
export class ViewBookingsComponent implements OnInit {
  slots: any[] = [];
  constructor(private fetchBookedSlotsService: FetchBookedSlotsService) {}

  ngOnInit(): void {
    this.fetchBookedSlotsService
      .fetchBookedSlots(localStorage.getItem('shopId'))
      .subscribe((data: any) => {
        this.slots = data;
        console.log(data);
      });
  }

}
