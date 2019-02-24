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
    private selectedEmp: TimeTrack;

    constructor(private dataSource: RestDataSource, private notificationService: NotificationService){
      dataSource.getTimeTracks().subscribe(data => {
          this.timetracks = data;
         // console.log(data);
      });
    }

    getTimeTracks(){
      return this.timetracks;
    }
    getTimeByEmpId(empId: string){
      this.selectedEmp = this.timetracks.find(emp => emp.empId == empId);
      //console.log(this.selectedEmp);
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


   // count dates between two given dates

   date_count(start_date: string, end_date: string){
    let counted_date = 0;
    let dates_in_month = 30; 
    let start_day = this.format_day(start_date);
    let end_day = this.format_day(end_date);
    let start_month = this.format_month(start_date); 
    let end_month = this.format_month(end_date); 
    let date_array = this.selectedEmp.absentDates;
    
    if (this.format_year(start_date) == this.format_year(end_date)){
      for (let i = 0; i < date_array.length; i++){

        let formated_month = this.format_month(date_array[i]);
        let formated_date = this.format_day(date_array[i]);

          if(end_month == formated_month && formated_date <=end_day){
            console.log('mathcing dates ' + date_array[i])
            counted_date ++;
          }
          if(start_month == formated_month && formated_date >= start_day){
            console.log('mathcing dates ' + date_array[i])
            counted_date ++;
          
          }
      
      }
      console.log(' counted ' + counted_date);
    }

  /*
    if (this.format_year(start_date) == this.format_year(end_date)){
        if(start_month == end_month){
       //   counted_date = end_day - start_day
          console.log('Number of days in between is ' + counted_date);
        } else {
            if (start_day <= end_day){
              counted_date = ((end_month - start_month) * dates_in_month) + (end_day - start_day)
              console.log('Number of days with different months is ' + counted_date)
            } else {
              counted_date = ((end_month - start_month) * dates_in_month) - (start_day - end_day)
              console.log('When start date in a month is greater ' + counted_date);
            }
        }
    } */

   return counted_date;
  }


  // get date numbers from input

  format_day(date: string): number{
    let split_date = date.split('-');
    let date_day = Number(split_date[2]); 
    return date_day; 
  }

  format_month(date: string): number {
      let split_date = date.split('-');
      let date_month = Number(split_date[1]); 
      return date_month;
  }

  format_year(date: string): number{
      let split_date = date.split('-');
      let date_year = Number(split_date[0]);
      return date_year;
  }

}