import {Component,OnInit, Injectable} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../../model/employee.model';
import { TimeTrack } from '../../model/timeTrack.model';
import { TimeTrackRepository } from '../../model/timetrack.repository';
import { EmployeeRepository } from '../../model/employee.repository';
import {NgbTimepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from "@angular/forms"; 
import {NgbDatepickerI18nEth} from '../../model/ethcalendar.service';
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


export class TimetrackComponent implements OnInit {

  private sickTime: string [] = [];
  displayMonths = 2;
  time = { hour: 1, minute: 1 };
  disabled: boolean;
  empID = '';
  employee: Employee;
  timetrack: TimeTrack;
  formSubmitted: boolean = false; 
  model: NgbDateStruct;
  date: string;
  private other: boolean;

  constructor(
    private calendar: NgbCalendar,
    private employeeRepo: EmployeeRepository,
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

  ngOnInit() {

   
    
  }

  dateSelected(): string{
    return this.model.year+'-'+this.model.month+'-'+this.model.day;
  }

  // trying to work with the time element

  getTime(date: string) {
    
    // to be used when date filtering is required, probabaly in the reports page ..

   //  date = this.dateSelected().substring(0,6)
    let val: string [];
    this.timetrackRepo.getTimeTracks().filter(tm => {
      val = tm.absentDates.toString().split(',');
    //this.indexes(tm.absentDates.toString(), "2011-05");
     })
     console.log('selected date '+date);
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
          console.log(result);
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  isAnswerProvided() {
    console.log(this.disabled);
  }

  getSalaries (){

  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      console.log(reason);
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      console.log(reason);
      return 'by clicking on a backdrop';
    } else {
      console.log(reason);
      return `with: ${reason}`;
    }
  }

  // gets the searched value from the input filed

  searchEmp(empID: string) {
    this.employee = this.employeeRepo.getEmployeeByEmpId(empID.trim());
    return this.employee;
    // console.log(this.employee)
  }

  // handle date entry

  save(val: string){
    this.other = false;
    switch (val.trim()) {
      case "ቀሪ መዝግብ":
        console.log('absent date ')
        break;
      case "ሰዓት መዝግብ":
      console.log('hour date ')
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

  saveTime(){}
  clear(){}

  isAbsent(form: NgForm) {
    
    /*
    const date = this.dateYear+'-'+this.dateMonth+'-'+this.dateDay;
    this.timetrack = new TimeTrack(
      this.employee.id, this.employee.empId, date);
      this.formSubmitted = true;

    if(form.valid && !this.monthFlow && !this.dayFlow){ 
      this.timetrackRepo.saveNewAbsent(this.timetrack);
      this.formSubmitted = false; 
      this.employee = new Employee(0); 
      form.reset(); 
    }
    */
   this.date = this.model.year + '-'+ this.model.month + '-' + this.model.day
   this.timetrack = new TimeTrack(this.employee.id, '', '', this.date)
   this.timetrackRepo.saveNewAbsent(this.timetrack);


  }

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

  check(){
   // this.monthFlow = false;
   // if (this.dateMonth > 12){
   //   this.monthFlow = true;
   // } 
   
  }
  checkTwo(){
    // this.dayFlow = false;
    // if (this.dateDay > 30){
    //   this.dayFlow = true;
    // } 
   
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
