import { Component } from '@angular/core';
import { Employee } from '../../model/employee.model';
import { EmployeeRepository } from '../../model/employee.repository';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
  selectedEmployee: Employee;
  selectedUser: any;
  display: string;
  isSelected: string; 
  deleteEmp: boolean; 

  constructor(private repository: EmployeeRepository, private modalService: NgbModal) {
    this.selectedEmployee = new Employee(0);
    this.display = '';
    this.deleteEmp = false; 
    this.getUser();
  }

  getEmployees(): Employee[] {
    return this.repository.getEmployees();
  }

  // get selected employee

  getSelectedEmp(emp: Employee) {
    this.selectedEmployee = emp;
  }

  getUser(){
    this.repository.getUsers().subscribe((resp) => {
      this.selectedUser = resp.body[2].providerData.picture.data.url
      console.log('got user ' + resp.body[2].firstName)
    }, error => {
      console.log('error occured')
    })
  }

  // get selected employee

  getSelected(emp: Employee): boolean {
    return this.isSelected === emp.empId;
  }

  deleteEmployee(empId: number) {
    this.repository.deleteEmployee(empId);
    this.selectedEmployee = new Employee(0);
  }

  getDepartment(): string[] {
    return this.repository.getDepartment();
  }

  

  // modal 

  closeResult: string;

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          console.log(this.closeResult);
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          console.log(this.closeResult);
        }
      );
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

  handleModal(yes: boolean){
    if (yes==true){
      this.modalService.dismissAll(); 
      this.deleteEmp = true;  
      this.deleteEmployee(this.selectedEmployee.id); 
    } else {
      this.modalService.dismissAll(); 
      this.deleteEmp = false;  
    }
   
  }
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
}
