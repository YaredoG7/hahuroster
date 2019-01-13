
import { Component } from "@angular/core";
import {
  NgbDateStruct,
  NgbCalendar,
  NgbDate
} from "@ng-bootstrap/ng-bootstrap";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Employee } from "../../model/employee.model";
import { TimeTrack } from "../../model/timeTrack.model";
import { TimeTrackRepository } from "../../model/timetrack.repository";
import { EmployeeRepository } from "../../model/employee.repository";

@Component({
  selector: "app-timetrack",
  templateUrl: "./timetrack.component.html",
  styleUrls: ["./timetrack.component.css"]
})
export class TimetrackComponent {
  model: NgbDateStruct;
  date: { year: number; month: number; day: number };
  displayVal: boolean;
  displayMonths = 2;
  hoveredDate: NgbDate;
  time = { hour: 1, minute: 1 };
  fromDate: NgbDate;
  toDate: NgbDate;
  holidaySelect: boolean;
  disabled: boolean;
  empID = "";
  employee: Employee;
  timetrack: TimeTrack;

  constructor(
    private calendar: NgbCalendar,
    private employeeRepo: EmployeeRepository,
    private timetrackRepo: TimeTrackRepository,
    private modalService: NgbModal
  ) {
    this.selectToday();
    this.holidaySelect = false;
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), "d", 10);
    this.displayVal = false;
    this.timetrack = new TimeTrack(0);
    this.employee = new Employee(1);
    console.log(this.empID);
  }

  closeResult: string;

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      console.log(reason);
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      console.log(reason);
      return "by clicking on a backdrop";
    } else {
      console.log(reason);
      return `with: ${reason}`;
    }
  }

  // gets the searched value from the input filed

  searchEmp(empID: string) {
    this.employee = this.employeeRepo.getEmployeeByEmpId(empID.trim());
    return this.employee;
    //console.log(this.employee)
  }

  // handle date entry

  // handle time entry

  isAbsent() {
    this.timetrack = new TimeTrack(
      this.employee.id,
      " ",
      "2019-12-12",
      "2112-21-12",
      "2100-12-12",
      2,
      12,
      10,
      15
    );
    this.timetrackRepo.saveNewAbsent(this.timetrack);
  }

  hoursWasted() {
    this.timetrack = new TimeTrack(5, "", "", "", "", 3, 3);
    this.timetrackRepo.hoursWasted(this.timetrack);
  }

  overTime() {
    this.timetrack = new TimeTrack(2, "", "", "", "", 0, 0, 10, 30);
    this.timetrackRepo.overTime(this.timetrack);
  }

  sickLeave() {
    this.timetrack = new TimeTrack(2, "", "", "2012-10-30");
    this.timetrackRepo.sickLeave(this.timetrack);
  }

  insertHoliday() {
    this.timetrack = new TimeTrack(5, "", "", "", "2017-12-30");
    this.timetrackRepo.insertHoliday(this.timetrack);
  }

  getDate() {
    return this.model.year + "-" + this.model.month + "-" + this.model.day;
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  setDate(): string {
    return this.model.year + "-" + this.model.month + "-" + this.model.day;
  }

  setTime(): string {
    return this.time.hour + ":" + this.time.minute;
  }

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
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      date.equals(this.toDate) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
}
