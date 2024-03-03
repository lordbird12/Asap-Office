// user-image.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LastDateService {
  
  getLastDate(item: any): string | null {
    if (item.activitys && item.activitys.length > 0) {
      const lastActivity = item.activitys[item.activitys.length - 1];
      return lastActivity.created_at && lastActivity.created_at ? lastActivity.created_at : null;
    }
    return null;
  }
}
