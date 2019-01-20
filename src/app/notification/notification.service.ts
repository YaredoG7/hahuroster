import { Injectable } from '@angular/core';
import {Router, NavigationStart} from '@angular/router'; 
import {Observable} from 'rxjs'; 
import {INotify, HahuNotification, NotificationType} from '../model/notification'; 
import {ReplaySubject} from 'rxjs'; 

@Injectable()
export class NotificationService {

  private notificationRPSubject = new ReplaySubject<INotify>(); 
  private keepAfterRouteChange = false; 

  constructor(private router: Router) {
    // clear notification message on route change unless 'keepAfterRouteChange' is true
    router.events.subscribe(event => {
      if(event instanceof NavigationStart){
        if(this.keepAfterRouteChange){
          // only keep for a single route change 
          this.keepAfterRouteChange = false; 
        } else {
          // clear notification message 
          this.resetNotification(); 
        }
      }
    }); 
   }

   getNotification(): Observable<INotify> {
     return this.notificationRPSubject.asObservable(); 
   }

   setNotification(data: INotify): void {
    this.notificationRPSubject.next(data); 
   }

   resetNotification() {
    this.setNotification(new HahuNotification()); 
   }

   success(message: string, keepAfterRouteChange = false){
     this.notification(NotificationType.Success, message, keepAfterRouteChange); 
   }

   error(message: string, keepAfterRouteChange = false){
     this.notification(NotificationType.Error, message, keepAfterRouteChange);
   }

   info(message: string, keepAfterRouteChange = false){
    this.notification(NotificationType.Info, message, keepAfterRouteChange);
  }

  warning(message: string, keepAfterRouteChange = false){
    this.notification(NotificationType.Warning, message, keepAfterRouteChange);
  }

  private notification(type: NotificationType, message: string, keepAfterRouteChange = false) {
   this.resetNotification(); 
   this.keepAfterRouteChange = keepAfterRouteChange; 
   this.setNotification(<INotify>{type: type, message: message}); 
  }
}
