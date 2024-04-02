import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FetchBookedSlotsService } from '../services/fetchBookedSlots/fetch-booked-slots.service';
import interactionPlugin from '@fullcalendar/interaction';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    eventContent: this.customEventContent.bind(this),
  };

  slots: any[] = [];
  services: any[] = [];

  constructor(private fetchBookedSlotsService: FetchBookedSlotsService) {}

  ngOnInit(): void {
    this.fetchBookedSlotsService
      .fetchBookedSlots(localStorage.getItem('shopId'))
      .subscribe((data: any) => {
        this.slots = data;
        this.initCalendar();
      });
  }

  initCalendar() {
    this.calendarOptions.events = this.slots.map((slot) => ({
      title: slot.employeeName,
      start: slot.bookingDate,
      extendedProps: {
        // Store additional properties in extendedProps
        bookingId: slot.bookingId,
        serviceName: slot.serviceName,
        slotDuration: slot.slotDuration,
        slotTime: slot.slotTime,
      },
    }));
  }

  customEventContent(arg: any) {
    const event = arg.event;

    const content = document.createElement('div');
    content.innerHTML = `
      <span><b>Employee Name </b>${event.title}</span><br>
      <span><b>Duration: </b>${event.extendedProps.slotDuration}</span><br>
      <span><b>Service: </b><br>
      <ul>
      ${event.extendedProps.serviceName.trim().split(',').map((service: string) => `<li>${service.trim()}</li>`).join('')}
    </ul>
    </span>
      <span><b>Timing: </b>${event.extendedProps.slotTime}</span>
      <hr>
    `;
    return { domNodes: [content] };
  }
}
