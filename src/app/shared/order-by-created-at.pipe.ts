import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByCreatedAt',
  standalone: true
})
export class OrderByCreatedAtPipe implements PipeTransform {
  transform(array: any[]): any[] {
    console.log('aray',array)
    if (!Array.isArray(array) || array.length <= 1) {
      return array;
    }
    return array.sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }).reverse();
  }
}
