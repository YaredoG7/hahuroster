import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Salary } from '../../model/salary.model';
import {SalaryRepository} from '../../model/salary.repository'; 

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  closeResult: string;
  salary: Salary; 
  constructor(private modalService: NgbModal, private repository: SalaryRepository) {}

  ngOnInit() {}

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

  isAnswerProvided() {
    // console.log(this.disabled);
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

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
}
