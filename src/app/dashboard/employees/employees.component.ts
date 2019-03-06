import { Component } from '@angular/core';
import { Employee } from '../../model/employee.model';
import { EmployeeRepository } from '../../model/employee.repository';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {FileUploadService} from '../../model/file-upload.service';
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

  constructor(private repository: EmployeeRepository, 
    private modalService: NgbModal,
    private notificationService: NotificationService,  
    private ethCal: NgbDatepickerI18nEth,
    private fsUpload: FileUploadService, 
    private calendar: NgbCalendar) {
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
    /*
    const uploadData = new FormData();
    uploadData.append('emp_img', this.selectedFile, this.selectedFile.name);
    this.fsUpload.uploadFile(uploadData); 
    */
   this.notificationService.info('ፎቶ ወደ ዳታቤዝ ለመመዝገብ መልዕክት ይላኩለን!')
  }

  register() {
    if (!this.selectedEmployee.fullName){
      this.notificationService.error('የተመረጠ ሰራተኛ የለም!')
    } else {
     this.notificationService.success(` ${ this.selectedEmployee.fullName } `+  ` ${ this.currentRate } ` + 'የአድናቆት ኮከብ ተመዝግቦለታል')
    }
  
  }

  cancel() {
    this.notificationService.error('አልተመዘገበም');
  }

  getEmployees(): Employee[] {
    return this.repository.getEmployees();
  }

  // get selected employee

  getSelectedEmp(emp: Employee) {
    this.selectedEmployee = emp;
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
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
      this.notificationService.info('አዲስ መረጃ ለመመዝገብ እባክዎ የሙከራ ይለፍ ቃል ይጠይቁ!');
      this.modalService.dismissAll(); 
      this.deleteEmp = false;  
    }
   
  }
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
}
