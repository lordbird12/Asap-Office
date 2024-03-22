import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByUpdatedAt',
  standalone: true
})
export class OrderByUpdateAtPipe implements PipeTransform {
  transform(array: any[]): any[] {
    if (!Array.isArray(array) || array.length <= 1) {
      return array;
    }
    return array.sort((a, b) => {
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });
  }
}
