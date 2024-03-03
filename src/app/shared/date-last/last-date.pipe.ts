import { Pipe, PipeTransform } from '@angular/core';
import { LastDateService } from './date-last.service';

@Pipe({
  name: 'lastDate',
  standalone: true,
})
export class LastDatePipe implements PipeTransform {
  constructor(private _service: LastDateService) {}

  transform(item: any): string | null {
    return this._service.getLastDate(item);
  }
}