import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateDiff' ,
  standalone: true
})
export class DateDiffPipe implements PipeTransform {
  transform(created_at: string): string {
    const createdAtDate = new Date(created_at);
    const currentDate = new Date();

    const timeDifference = currentDate.getTime() - createdAtDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // ปรับปรุงนิดหน่อยเพื่อแสดงผลในรูปแบบที่เหมาะสม
    if (daysDifference === 0) {
      return 'Today';
    } else if (daysDifference === 1) {
      return 'Yesterday';
    } else {
      return `${daysDifference} days ago`;
    }
  }
}
