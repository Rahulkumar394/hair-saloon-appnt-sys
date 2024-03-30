import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(timeRange: string): string {
    if (!timeRange) {
      return '';
    }

    const [startTime, endTime] = timeRange.split('-');

    const formattedStartTime = this.formatTime(startTime);
    const formattedEndTime = this.formatTime(endTime);

    return `${formattedStartTime} - ${formattedEndTime}`;
  }

  private formatTime(time: string): string {
    const timeObject = new Date(`2000-01-01T${time}:00`); // Use a base date

    const hours = timeObject.getHours() % 12 || 12;  // Convert to 12-hour format (12 for midnight)
    const minutes = timeObject.getMinutes().toString().padStart(2, '0');
    const amPm = timeObject.getHours() >= 12 ? 'PM' : 'AM';

    return `${hours}:${minutes} ${amPm}`;
  }
}