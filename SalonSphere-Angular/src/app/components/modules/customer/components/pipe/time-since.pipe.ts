import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeSince'
})
export class TimeSincePipe  implements PipeTransform {
  transform(value: string): string {
    const date = new Date(value);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000); // Convert milliseconds to seconds
    const diffMins = Math.floor(diffSecs / 60); // Convert seconds to minutes
    const diffHrs = Math.floor(diffMins / 60); // Convert minutes to hours
    const diffDays = Math.floor(diffHrs / 24); // Convert hours to days
    const diffWeeks = Math.floor(diffDays / 7); // Convert days to weeks
    const diffMonths = Math.floor(diffDays / 30); // Convert days to months

    if (diffSecs < 60) {
      return diffSecs + ' seconds';
    } else if (diffMins < 60) {
      return diffMins + ' minutes';
    } else if (diffHrs < 24) {
      return diffHrs + ' hours';
    } else if (diffDays <= 7) {
      return diffDays + ' days';
    } else if (diffDays <= 30) {
      return diffWeeks + ' weeks';
    } else {
      return diffMonths + ' months';
    }
  }
}