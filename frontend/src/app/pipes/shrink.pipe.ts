import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shrink',
  standalone: true,
})
export class ShrinkPipe implements PipeTransform {
  transform(value: string): string {
    if (value.length > 20) {
      return value.slice(0, 17) + '...';
    }
    return value;
  }
}
