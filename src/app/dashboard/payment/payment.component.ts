import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import {Salary} from '../../model/salary.model'; 

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {



  constructor(private modalService: NgbModal) { }

  ngOnInit() {
 
  }

   // save slaries
   saveSlary(s: Salary){

 }

  getSlary(){

  }
 
  
  getEmployees(){}

  // modal handler 

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
   // console.log(this.disabled);
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

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
}
