import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTime',
  standalone: true,
})
export class DateTimePipe implements PipeTransform {
  transform(date: Date | string | null): string | null {
    const format: string = 'MMM dd, yyyy | hh:mm a';
    if (date === null) {
      return 'No Data';
    }
    return new DatePipe('en-Us').transform(date, format);
  }
}
