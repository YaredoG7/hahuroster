import { Component, ViewChild, ElementRef, OnInit, Injectable } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Salary } from "../../model/salary.model";
import { SalaryRepository } from "../../model/salary.repository";
import { Employee } from "../../model/employee.model";
import { EmployeeRepository } from "../../model/employee.repository";
import { TimeTrackRepository } from '../../model/timetrack.repository';
import {NgbDatepickerI18nEth} from '../../model/ethcalendar.service';
import {
  NgbCalendar,
  NgbDatepickerI18n,
  NgbCalendarPersian,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';
import { TimeTrack } from 'src/app/model/timeTrack.model';



@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"], 
  providers: [
    {provide: NgbCalendar, useClass: NgbCalendarPersian},
    {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nEth}
  ]
})
export class PaymentComponent implements OnInit {
  @ViewChild("notify") notify: ElementRef;

  /** Variables for calculation of payment **/
  private deduction: number = 0;
  private pension: number = 0;
  private taxCalc: number = 0;
  private addable: number = 0;

  /** Variables used for custom addable or deductions **/
  private reason: string;
  private percent: number;
  private amount: number;

  /** Variables used for creating creating table for addable and deduction **/
  private addableArray: Array<any> = [];
  private subsArray: Array<any> = [];
  private newAttribute: any = {};

  /** Dynamic value update based on selection **/
  private toCalulate: string;
  private deductActive: boolean;

  /** Absent penality variables  **/
  private absentDates: number = 4; 
  private hoursWasted: string = '03:80';
  private absentPenality: number; 
  private hourPenality: number ;
  private penalityRate: number;
  private start_date: NgbDateStruct; 
  private end_date: NgbDateStruct; 

  public salary: Salary;
  public employee: Employee;
  public closeResult: string;

  // to be retrived from selected employee
  private grosspayment: number = 12000;

  constructor(
    private employeeRepo: EmployeeRepository,
    private modalService: NgbModal,
    private repository: SalaryRepository, 
    private timetrackRepo: TimeTrackRepository
  ) {
    this.employee = new Employee(1);
  }

  ngOnInit() {}

  // get searched employee

  searchEmp(empID: string) {
    this.employee = this.employeeRepo.getEmployeeByEmpId(empID.trim());
    return this.employee;
  }

  // get salaries
  getSalaries(): Salary[] {
    return this.repository.getSalaries();
  }

  calTax(rate: string) {
    let curr = 0;
    switch (rate.trim()) {
      case "10%":
        curr = this.grosspayment * 0.1 - 60; // for 10 percent deduction is 60 birr
        break;
      case "15%":
        curr = this.grosspayment * 0.15 - 142.5;
        break;
      case "20%":
        curr = this.grosspayment * 0.2 - 302.5;
        break;
      case "25%":
        curr = this.grosspayment * 0.25 - 565;
        break;
      case "30%":
        curr = this.grosspayment * 0.3 - 955;
        break;
      case "35%":
        curr = this.grosspayment * 0.35 - 1500;
        break;
    }
    this.taxCalc = curr;
  }

  // calculate pension

  calPension(rate: string) {
    let pen = 0;
    if (rate.trim() === "7%") {
      pen = this.grosspayment * 0.07;
    } else if (rate.trim() === "0%") {
      pen = 0;
    } else {
      this.modalService.open(this.notify, { centered: true });
    }
    // console.log(pen)
    this.pension = pen;
  }

  percentAmt(percent: number) {
    const amount = this.grosspayment * (percent / 100);
    this.newAttribute.amount = amount.toFixed(2);
  }

  totalAmt(amount: number) {
    let amt = 0;
    const percent = (100 * amount) / this.grosspayment;
    this.newAttribute.percent = percent.toFixed(2);
    return amt + amount;
  }

  // Update the table dynamically 

  addFieldValue() {
    let amt = 0;
    if (this.deductActive) {
      this.subsArray.push(this.newAttribute);
      this.deduction = this.deduction + Number(this.newAttribute.amount);
      this.newAttribute = {};
    } else {
      this.addableArray.push(this.newAttribute);
      this.addable = this.addable + Number(this.newAttribute.amount);
      this.newAttribute = {};
    }
  }

  deleteAdds(index) {
    this.addable = this.addable - this.addableArray[index].amount;
    this.addableArray.splice(index, 1);
  }

  deleteSubs(index) {
    this.deduction = this.deduction - this.subsArray[index].amount;
    this.subsArray.splice(index, 1);
  }

  date_formater(date: NgbDateStruct){
    let date_value = ''
    date_value = date.year+'-'+date.month+'-'+date.day;
    console.log('converted date ' + date_value)
    return date_value;
  }

  // count dates in month
  get_date_count(): number{
   let date_count = 0;
   if(this.start_date != undefined && this.end_date != undefined){
    date_count = this.timetrackRepo.date_count(this.date_formater(this.start_date), this.date_formater(this.end_date));
   }
   return date_count;
  }

  // count hours in a month
  get_hour_count(){

  }

    // calc date penality 
  
    date_penality() : number{
      let total = (this.absentDates * this.penalityRate).toFixed(2)
     return Number(total)
    } 
  
    // calc hour penality
  
    hour_penality() : number{
      let day = 8; 
      let hour = 60;
      let hr_penality = 0;
      if (this.hoursWasted != null || this.hoursWasted !== undefined){
       let tot_hr = this.hoursWasted.split(':')
       let hr = Number(tot_hr[0]); 
       let min = Number(tot_hr[1]);
       let hour_sum = hr + (min/hour);
      
       hr_penality = this.penalityRate * (hour_sum / day)
  
      }
      return hr_penality;  
    }

  total_deduction() {
    let total = 0;
    total = this.deduction + this.pension + this.taxCalc + this.date_penality() + this.hour_penality();
    return Number(total.toFixed(2));
  }

  calcNet() {
    let net_pay = 0;
    net_pay = this.grosspayment + this.addable - this.total_deduction();
    // console.log(net_pay)
    return net_pay;
  }

  savePayment() {

  }

  // save salary
  saveSalary(salary: Salary) {
    salary = new Salary(
      "newEmp",
      5000,
      200,
      100,
      [{ reason: "absent days", amount: 150, qty: 5 }],
      [{ reason: "over time", amount: 500, qty: 2 }],
      400,
      4000
    );
    console.log(salary);
    this.repository.saveSalary(salary);
  }
  
  clear() {
     this.timetrackRepo.getTimeByEmpId(this.employee.empId);
     console.log(this.timetrackRepo.date_count('2011-4-01','2011-5-20'));
  // console.log(this.timetrackRepo.getTimeByEmpId(this.employee.empId))
  }

 

  getEmployees() {}


  // modal handler

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
    // this.extras.push(this.reason, this.percent, this.amount);
    console.log(this.reason, this.percent, this.amount);
  }

  // add extra sub and add

  getExtra() {}

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

  openVerticallyCentered(content, user: boolean) {
    if (user) {
      this.toCalulate = "ተጨማሪ";
      this.deductActive = false;
    } else {
      this.toCalulate = "ተቀናሽ";
      this.deductActive = true;
    }
    this.modalService.open(content, { centered: true });
  }
}
