import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../model/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService} from '../../notification/notification.service';
import {HahuNotification, INotify} from '../../model/notification'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public username: string;
  public password: string;
  public errorMessage: string;
  public admin: boolean; 
  public user: string;
  public notification: INotify; 

  constructor(private router: Router, 
    private notificationService: NotificationService,
    private auth: AuthService, 
    private modalService: NgbModal, ) {
    this.admin = true; 
  }

  ngOnInit(){
    this.subscribeToNotification(); 
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

  subscribeToNotification(): void {
    this.notification = new HahuNotification; 
    this.notificationService
      .getNotification()
      .subscribe(notification =>{
        this.notification = notification; 
      }); 
  }

  notify() {
  this.notificationService.warning('ፕሮግራሙን በነፃ ለመሞከር እባክዎን መልክት ይላኩለን')
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
  
  displayNotification(): boolean {
    return this.notification.message.length > 0; 
  }
  
  openVerticallyCentered(content, user: boolean) {
    if(user){
      this.user = 'አስተዳደር'; 
    } else {
      this.user = 'ሰራተኞች'; 
    }
    this.modalService.open(content, { centered: true });
  }

  authenticate(form: NgForm) {

    //console.log('auth method has been called... ')

    if (form.valid) {
      // do the authentication
      this.auth
        .authenticate(this.username, this.password)
        .subscribe(response => {
          if (response) {
            this.router.navigateByUrl('/dashboard/main');
            this.modalService.dismissAll();
          } else {
            this.errorMessage = 'Authentication Failed';
          }
        
        });
    } else {
      this.errorMessage = 'Form Data Invalid';
    }
  }

}
