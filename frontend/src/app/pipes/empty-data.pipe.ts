import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyData',
  standalone: true,
})
export class EmptyDataPipe implements PipeTransform {
  transform(value: string | null, message: string = 'No Data'): string {
    if (value) {
      return value;
    }
    return message;
  }
}
