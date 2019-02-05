import { Component, OnInit, HostBinding, AfterViewInit } from '@angular/core';
import {HahuNotification, NotificationType, INotify} from '../model/notification'; 
import {NotificationService} from './notification.service'; 
import { slideVerticalToggleAnimation } from '../../animations';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'], 
  animations: [slideVerticalToggleAnimation]
})
export class NotificationComponent implements OnInit, AfterViewInit {
  @HostBinding('class.app-notification') true; 
  notification: HahuNotification;

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService
     .getNotification()
     .subscribe(notification => {
       this.notification = notification; 
     })
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.resetNotification(); 
    }, 5000); 
  }

  cssClass(notification: INotify) {
    if (!notification) {
      return;
    }
    // return css class based on notification type
    switch (notification.type) {
      case NotificationType.Success:
        return 'alert alert-success text-white';
      case NotificationType.Error:
        return 'alert alert-danger text-white';
      case NotificationType.Info:
        return 'alert alert-info';
      case NotificationType.Warning:
        return 'alert alert-warning';
    }
  }
  removeNotification(): void {
    this.notificationService.resetNotification();
  }

  resetNotification(): void {
    this.notificationService.resetNotification();
  }

}
