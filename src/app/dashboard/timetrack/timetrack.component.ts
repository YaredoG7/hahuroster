import { Component } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../../model/employee.model';
import { TimeTrack } from '../../model/timeTrack.model';
import { TimeTrackRepository } from '../../model/timetrack.repository';
import { EmployeeRepository } from '../../model/employee.repository';
import {NgForm} from "@angular/forms"; 

@Component({
  selector: 'app-timetrack',
  templateUrl: './timetrack.component.html',
  styleUrls: ['./timetrack.component.css']
})
export class TimetrackComponent {
  displayMonths = 2;
  time = { hour: 1, minute: 1 };
  disabled: boolean;
  empID = '';
  employee: Employee;
  timetrack: TimeTrack;
  formSubmitted: boolean = false; 
  monthFlow: boolean = false; 
  dayFlow: boolean = false; 
  dateYear: number;
  dateMonth: number; 
  dateDay: number;
  isTrue: boolean;

  constructor(
    private employeeRepo: EmployeeRepository,
    private timetrackRepo: TimeTrackRepository,
    private modalService: NgbModal
  ) {
    this.timetrack = new TimeTrack(0);
    this.employee = new Employee(1);
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

  save(form: NgForm){

  }

  isAbsent(form: NgForm) {
    
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
  }

  hoursWasted() {
    this.timetrack = new TimeTrack(5, '', '', '', '', 3, 3);
    this.timetrackRepo.hoursWasted(this.timetrack);
  }

  overTime() {
    console.log(this.isTrue);
   // this.timetrack = new TimeTrack(2, '', '', '', '', 0, 0, 10, 30);
   // this.timetrackRepo.overTime(this.timetrack);
  }

  sickLeave() {
    this.timetrack = new TimeTrack(2, '', '', '2012-10-30');
    this.timetrackRepo.sickLeave(this.timetrack);
  }

  check(){
    this.monthFlow = false;
    if (this.dateMonth > 12){
      this.monthFlow = true;
    } 
   
  }
  checkTwo(){
    this.dayFlow = false;
    if (this.dateDay > 30){
      this.dayFlow = true;
    } 
   
  }

  insertHoliday(form: NgForm) {
    this.formSubmitted = true;
    if(form.valid && !this.monthFlow && !this.dayFlow){
    this.timetrackRepo.insertHoliday(this.timetrack);
    console.log(this.dateYear + ' ' + this.dateMonth + ' ' + this.dateDay + ' ' + this.time.minute);
    console.log(this.isTrue);
    this.formSubmitted = false;
    }
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
}
