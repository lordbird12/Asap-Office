// user-image.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserImageService {
  
  getLastUserImage(item: any): string | null {

    if (item.activitys && item.activitys.length > 0) {
      const lastActivity = item.activitys[item.activitys.length - 1];
      // console.log('111',lastActivity)
      return lastActivity.user && lastActivity.user.image ? lastActivity.user.image : null;
    }
    return 'assets/images/no_image.jpg';
  }
}
