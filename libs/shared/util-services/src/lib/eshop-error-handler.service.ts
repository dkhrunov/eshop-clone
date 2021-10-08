import { Injectable, ErrorHandler } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class EshopErrorHandlerService implements ErrorHandler {
  constructor(private notificationService: NzNotificationService) {}
  handleError(error: any): void {
    this.notificationService.blank('Error', error.error.message);

    console.log(error);
  }
}
