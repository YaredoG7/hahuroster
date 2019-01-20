export class INotify{
    type: NotificationType;
    message: string; 
}

export class HahuNotification implements INotify{
    constructor(public type = NotificationType.Info, public message = ''){}
}

export enum NotificationType {
    Success, 
    Error, 
    Info, 
    Warning
}