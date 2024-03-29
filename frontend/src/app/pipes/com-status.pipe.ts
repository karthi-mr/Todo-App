import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'comStatus',
  standalone: true,
})
export class ComStatusPipe implements PipeTransform {
  transform(is_completed: boolean): string {
    if (is_completed) {
      return 'Completed';
    }
    return 'Not completed';
  }
}
