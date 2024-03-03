// time-difference.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeDifference',
  standalone: true
})
export class TimeDifferencePipe implements PipeTransform {
    transform(created_at: string): string {
    // console.log(created_at)
    const currentDate = new Date();
    const createdAtDate = new Date(created_at);
    const timeDifference = currentDate.getTime() - createdAtDate.getTime();
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 1) {
      return `${this.formatDate(createdAtDate)} ${createdAtDate.getHours()}:${this.formatMinutes(createdAtDate.getMinutes())}`;
    } else if (hours > 0) {
      return `เมื่อวานนี้ ${createdAtDate.getHours()}:${this.formatMinutes(createdAtDate.getMinutes())}`;
    } else if (minutes > 0) {
      return `วันนี้ ${createdAtDate.getHours()}:${this.formatMinutes(createdAtDate.getMinutes())}`;
    } else {
      return `เมื่อวานนี้ ${createdAtDate.getHours()}:${this.formatMinutes(createdAtDate.getMinutes())}`;
    }
  }

  private formatMinutes(minutes: number): string {
    return minutes < 10 ? `0${minutes}` : `${minutes}`;
  }

  private formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${this.formatNumber(day)}/${this.formatNumber(month)}/${year}`;
  }

  private formatNumber(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
