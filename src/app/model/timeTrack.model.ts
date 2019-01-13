export class TimeTrack {

    constructor(

       public id?: number, 
       public empId?: string, 
       public absentDates?: string,
       public sickDates?: string, 
       public holidays?: string,
       public lateHours?: number, 
       public lateMinutes?: number, 
       public overTimeHour?: number,
       public overTimeMinutes?: number

    ){
       
        

    }
   
}

