import {Component} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../../model/employee.model';
import { TimeTrack } from '../../model/timeTrack.model';
import { TimeTrackRepository } from '../../model/timetrack.repository';
import { EmployeeRepository } from '../../model/employee.repository';
import {NgbTimepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from "@angular/forms"; 
import {NgbDatepickerI18nEth} from '../../model/ethcalendar.service';
import { NotificationService} from '../../notification/notification.service';
import {
  NgbCalendar,
  NgbDate,
  NgbDatepickerI18n,
  NgbCalendarPersian,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-timetrack',
  templateUrl: './timetrack.component.html',
  styleUrls: ['./timetrack.component.css'], 
  providers: [
    {provide: NgbCalendar, useClass: NgbCalendarPersian},
    {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nEth}
  ]
})


export class TimetrackComponent {

  sickTime: string [] = [];
  displayMonths = 2;
  time = { hour: 1, minute: 1 };
  disabled: boolean;
  empID = '';
  employee: Employee;
  timetrack: TimeTrack;
  formSubmitted: boolean = false; 
  model: NgbDateStruct;
  date: string;
  other: boolean;

  constructor(
    private calendar: NgbCalendar,
    private employeeRepo: EmployeeRepository,
    private notificationService: NotificationService,
    private timetrackRepo: TimeTrackRepository,
    private modalService: NgbModal, 
    private config: NgbTimepickerConfig
  ) {
    this.timetrack = new TimeTrack(0);
    this.employee = new Employee(1);
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.config.spinners = false;
  }

  dateSelected(): string{
    return this.model.year+'-'+this.model.month+'-'+this.model.day;
  }
  timeSelected(): string{
    return this.time.hour+':'+this.time.minute;
  }

  // trying to work with the time element

  getTime(date: string) {
    
    // to be used when date filtering is required, probabaly in the reports page ..

   //  date = this.dateSelected().substring(0,6)
    let val: string [];
    this.timetrackRepo.getTimeTracks().filter(tm => {
      val = tm.absentDates.toString().split(',');
     })

      for (let i = 0; i < val.length; i++){
      var found = val[i].match(date); 
     
      if (found != null) {
        console.log(found.input);
      }

   } 
  }

  closeResult: string;

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  getSalaries (){

  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // gets the searched value from the input filed

  searchEmp(empID: string) {
    this.employee = this.employeeRepo.getEmployeeByEmpId(empID.trim());
    return this.employee;
    // console.log(this.employee)
  }

  // prepare time track based on different selections

  get_timetrack(input?: any, input1?:any, input2?: any, input3?: any, input4?: any, input5?:any){
    return new TimeTrack(
      this.employee.id, 
      this.employee.empId, 
      this.employee.fullName, 
      input, //Absent date   
      input1, //Sick date
      input2, //Hoildays
      input3, //Latetime
      input4, //Overtime  
      input5 , //Comment
    )
  }

  // handle date entry
  val: string;
  save(){
    this.other = false;
    let comment = '';
    switch (this.val.trim()) {
      case "ቀሪ መዝግብ":
      let date_update = '';
      if(this.model !== undefined ){
        date_update = this.dateSelected();
      }
      this.timetrackRepo.saveNewAbsent(this.get_timetrack(date_update)); 
        break;
      case "ሰዓት መዝግብ":
      let time_update = '';
      if (this.time !== undefined){
        time_update = this.timeSelected();
      }
      //console.log(time_update);
      this.timetrackRepo.hoursWasted(this.get_timetrack('','','', time_update));
        break;
      case "ቀሪ (በህመም)":
       
        break;
      case "የእረፍት ፈቃድ":
        
        break;
      case "ኦቨር ታይም":
        
        break;
      case "ሌላ ምክንያት":
        this.other = true; 
        break;
    }

  }

  saveTime(){
    this.notificationService.info('አዲስ መረጃ ለመመዝገብ እባክዎ የሙከራ ይለፍ ቃል ይጠይቁ!');
  }
  clear(){}

  hoursWasted() {

    this.timetrackRepo.hoursWasted(this.timetrack);
  }

  overTime() {
  
  }

  sickLeave() {
    this.date = this.model.year + '-'+ this.model.month + '-' + this.model.day
    this.timetrack = new TimeTrack(this.employee.id, '', '', '', this.date)
    this.timetrackRepo.sickLeave(this.timetrack);
  }

  insertHoliday() {
    this.date = this.model.year + '-'+ this.model.month + '-' + this.model.day
    this.timetrack = new TimeTrack(this.employee.id, '', '', '','',this.date)
    this.timetrackRepo.insertHoliday(this.timetrack)
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }


  /** Calendar display **/

  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

}
