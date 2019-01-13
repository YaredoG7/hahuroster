import {Injectable} from "@angular/core";
//import {StaticDataSource} from "./static.datasource";
import {RestDataSource} from "./rest.datasource"; 
import {Observable} from "rxjs";
import {TimeTrack} from "./timeTrack.model";
import {Employee} from "./employee.model"; 

@Injectable()

export class TimeTrackRepository{
    private timetracks: TimeTrack[] = []; 

    constructor(private dataSource: RestDataSource){
      dataSource.getTimeTracks().subscribe(data => {
          this.timetracks = data;
        //  console.log(data);
      });
    }

    getTimeTracks(){
      
    }

    registerTime(timetrack: TimeTrack){
        this.dataSource.registerTime(timetrack).subscribe(tr => this.timetracks.push(tr))
    }

    saveNewAbsent(timetrack: TimeTrack){
       // for saving the absentees
        this.dataSource.saveNewAbsent(timetrack).subscribe(tr => {
            this.timetracks.splice(this.timetracks.findIndex(tr => tr.empId == timetrack.empId), 1, timetrack)
            })    
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