import { Component } from '@angular/core';
import { Employee } from '../../model/employee.model';
import { EmployeeRepository } from '../../model/employee.repository';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {FileUploadService} from '../../model/file-upload.service';
import {NgbDatepickerI18nEth} from '../../model/ethcalendar.service';
import {
  NgbCalendar,
  NgbDate,
  NgbDatepickerI18n,
  NgbCalendarPersian,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'], 
  providers: [
    {provide: NgbCalendar, useClass: NgbCalendarPersian},
    {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nEth}
  ]
})
export class EmployeesComponent {
  selectedEmployee: Employee;
  selectedUser: any;
  display: string;
  isSelected: string; 
  deleteEmp: boolean; 
  url: any;
  currentRate = 8;
  ethio_date: any;

  constructor(private repository: EmployeeRepository, private modalService: NgbModal,  private ethCal: NgbDatepickerI18nEth,
    private fsUpload: FileUploadService, private calendar: NgbCalendar,) {
    this.selectedEmployee = new Employee(0);
    this.display = '';
    this.deleteEmp = false; 
    let date = this.calendar.getToday();
    
    this.ethio_date = this.ethCal.getDayAriaLabel(new NgbDate(date.year, date.month, date.day+2));
  }

  selectedFile: File

  onFileChanged(event:any){
    if (event.target.files && event.target.files[0]){
      this.selectedFile = event.target.files[0]
      var reader = new FileReader(); 
      reader.readAsDataURL(this.selectedFile); 
      reader.onload = (event:any) => {
        this.url = event.target.result;
      }
    }   
  }
  onUpload(){
    const uploadData = new FormData();
    uploadData.append('emp_img', this.selectedFile, this.selectedFile.name);
    this.fsUpload.uploadFile(uploadData);

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
