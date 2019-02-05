import {Injectable} from "@angular/core";
//import {StaticDataSource} from "./static.datasource";
import {RestDataSource} from "./rest.datasource"; 
import {Observable} from "rxjs";
import {TimeTrack} from "./timeTrack.model";
import {Employee} from "./employee.model"; 
import { NotificationService} from '../notification/notification.service';

@Injectable()

export class TimeTrackRepository{
    private timetracks: TimeTrack[] = []; 

    constructor(private dataSource: RestDataSource, private notificationService: NotificationService){
      dataSource.getTimeTracks().subscribe(data => {
          this.timetracks = data;
         // console.log(data);
      });
    }

    getTimeTracks(){
      return this.timetracks;
    }

    registerTime(timetrack: TimeTrack){
        this.dataSource.registerTime(timetrack).subscribe(tr => this.timetracks.push(tr))
    }

    saveNewAbsent(timetrack: TimeTrack){
      
        // for saving the absentees
       this.dataSource.saveNewAbsent(timetrack).subscribe((resp) => {
        this.timetracks.push(resp.body); 
        if(resp.status == 200){
         this.notificationService.success('መረጃው በተሳካ ሁኔታ ተመዝግቧል')
        } }, error => {
         this.notificationService.error('ያልተሳካ ምዝገባ ' + error); 
         console.log(error); 
     });
        }

     hoursWasted(timetrack:TimeTrack){
            this.dataSource.hoursWasted(timetrack).subscribe(tr => {
                this.timetracks.splice(this.timetracks.findIndex(tr => tr.id == timetrack.id), 1, timetrack)
             }); 
            //throw error
            console.log("throw error")
    }

    overTime(timetrack: TimeTrack){
            this.dataSource.overTime(timetrack).subscribe(tr => {
                this.timetracks.splice(this.timetracks.findIndex(tr => tr.id == timetrack.id), 1, timetrack)
             }); 
    }

    sickLeave(timetrack: TimeTrack){
        this.dataSource.sickLeave(timetrack).subscribe(tr => {
            this.timetracks.splice(this.timetracks.findIndex(tr => tr.id == timetrack.id), 1, timetrack)
         }); 
    }

    insertHoliday(timetrack: TimeTrack){
          this.dataSource.insertHoliday(timetrack).subscribe(tr => {
            this.timetracks.splice(this.timetracks.findIndex(tr => tr.id == timetrack.id), 1, timetrack)
         }); 
        }
}