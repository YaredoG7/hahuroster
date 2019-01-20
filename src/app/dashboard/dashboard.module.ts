import {NgModule} from "@angular/core"; 
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {ModelModule} from "../model/model.module";
import {DashboardComponent} from "./dashboard.component";
import {RouterModule} from "@angular/router";
import { EmployeesComponent } from './employees/employees.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import {EditEmployeeComponent} from "./editEmployee.component";
import { TimetrackComponent } from './timetrack/timetrack.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PaymentComponent } from './payment/payment.component';
import { ReportsComponent } from './reports/reports.component';
import { NotificationComponent } from '../notification/notification.component'; 
import {NotificationService} from '../notification/notification.service'; 




@NgModule({
    imports: [ModelModule, BrowserModule, FormsModule, RouterModule, NgbModule],
    providers: [NotificationService],
    declarations: [DashboardComponent, EmployeesComponent, LoginComponent, MainComponent, 
          EditEmployeeComponent, TimetrackComponent, PaymentComponent, ReportsComponent , NotificationComponent], 
    exports: [DashboardComponent], 
    
})
export class DashboardModule{}