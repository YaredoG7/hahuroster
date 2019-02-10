import { Component,  ViewChild, ElementRef, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Salary } from '../../model/salary.model';
import {SalaryRepository} from '../../model/salary.repository'; 
import { Employee } from '../../model/employee.model';
import { EmployeeRepository } from '../../model/employee.repository';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @ViewChild('notify') notify: ElementRef;

  closeResult: string;
  salary: Salary; 
  employee: Employee;
  taxCalc: number = 0; 
  reason: string; 
  percent: number; 
  amount: number;
  grosspayment: number = 2000;
  addable: number = 0 ;
  deduction: number = 0;
  toCalulate: string
  deductActive: boolean;


 private addableArray: Array<any> = [];
 private subsArray: Array<any> = [];
 private newAttribute: any = {};

  constructor(private employeeRepo: EmployeeRepository, 
              private modalService: NgbModal, 
              private repository: SalaryRepository) {
                this.employee = new Employee(1);
              }

  ngOnInit() { }

  calTax(rate: string) {
      let curr = 0;  
        switch(rate.trim()){
          case '10%':
          curr = (this.grosspayment * 0.1) - 60; // for 10 percent deduction is 60 birr 
          break;
          case '15%':
          curr =  (this.grosspayment * 0.15) - 142.50;
          break; 
          case '20%':
          curr =  (this.grosspayment * 0.2) - 302.50;
          break;
          case '25%':
          curr =  (this.grosspayment * 0.25) - 565;
          break; 
          case '30%':
          curr =  (this.grosspayment * 0.3) - 955;
          break;
          case '35%':
          curr =  (this.grosspayment * 0.35) - 1500;
          break; 
        }
        this.taxCalc = curr;
  }

  // calculate pension 

  calPension(rate: string) {
    let pen = 0;
     if (rate === "7%"){
      pen =  (this.grosspayment * 0.07);
     } else {
      this.modalService.open(this.notify, { centered: true })
      }
    return this.taxCalc = this.taxCalc + pen; 
  }


  percentAmt(percent: number){
    const amount = this.grosspayment * (percent/ 100) 
    this.newAttribute.amount = (amount).toFixed(2);
  }

  totalAmt(amount : number ){
    let amt = 0; 
    const percent = (100 * amount) / this.grosspayment;
    this.newAttribute.percent = (percent).toFixed(2);
    console.log(amt + amount);
    return amt + amount;
  }

    // deductable from table 

    calcNet(){ 
     
    }

  calDed(){
    console.log(this.taxCalc)
   
  }



  searchEmp(empID: string) {
    this.employee = this.employeeRepo.getEmployeeByEmpId(empID.trim());
    return this.employee;
  
  }


  // get salaries 
  getSalaries(): Salary[]{
  return this.repository.getSalaries();
  }

   
  // save salary
  saveSalary(salary: Salary){
    salary = new Salary("newEmp", 5000, 200, 100, [{reason: "absent days", amount: 150, qty: 5}], [{reason: "over time", amount: 500, qty:2}], 400, 4000);
    console.log(salary);
    this.repository.saveSalary(salary); 
  }

  getEmployees() {}

  // modal handler
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
  
  addFieldValue(){
     let amt = 0; 
    if(this.deductActive){
      this.subsArray.push(this.newAttribute)
      this.deduction = this.deduction + Number(this.newAttribute.amount); 
      this.newAttribute = {};
    } else {
      this.addableArray.push(this.newAttribute)
      this.addable = this.addable + Number(this.newAttribute.amount);
      this.newAttribute = {};
    }
}
  
  deleteAdds(index){
      this.addable=  this.addable - this.addableArray[index].amount
      this.addableArray.splice(index, 1); 
  }

  deleteSubs(index){
    this.deduction = this.deduction - this.subsArray[index].amount
      this.subsArray.splice(index, 1); 
  }


  isAnswerProvided() {
   // this.extras.push(this.reason, this.percent, this.amount);
    console.log(this.reason, this.percent, this.amount)
  }

    // add extra sub and add 

    getExtra() {
   
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

  openVerticallyCentered(content, user: boolean) {
    if(user){
      this.toCalulate = 'ተጨማሪ';
      this.deductActive = false;
    } else {
      this.toCalulate = 'ተቀናሽ';
      this.deductActive = true;
    }
    this.modalService.open(content, { centered: true });
  }
}
