import { Pipe, PipeTransform } from '@angular/core';
import { UserImageService } from './user-image.service';

@Pipe({
  name: 'lastUserImage',
  standalone: true,
})
export class LastUserImagePipe implements PipeTransform {
  constructor(private userImageService: UserImageService) {}

  transform(item: any): string | null {
    return this.userImageService.getLastUserImage(item);
  }
}