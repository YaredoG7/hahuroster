import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from "../dashboard/dashboard.component"; 
import {LoginComponent} from "../dashboard/login/login.component"; 
import {EmployeesComponent} from "../dashboard/employees/employees.component";
import {MainComponent} from "../dashboard/main/main.component";
import {AuthGuard} from "../dashboard/auth.guard"; 
import {EditEmployeeComponent} from "../dashboard/editEmployee.component";
import {TimetrackComponent} from "../dashboard/timetrack/timetrack.component";
import { PaymentComponent } from '../dashboard/payment/payment.component';
import { ReportsComponent } from '../dashboard/reports/reports.component';


const routes: Routes = [

      {
        path: "login",
        component: LoginComponent

      }, 
      {
        path: "main",
        component: MainComponent
       // canActivate: [AuthGuard]

      }, 
      {
        path: "employees", 
        component: EmployeesComponent, 
        
      
      //  canActivate: [AuthGuard]  
      }, 
      {
        path: "employees/:mode/:id", component: EditEmployeeComponent
      }, 
      {
        path: "employees/:mode", component: EditEmployeeComponent
      },
      {
        path: "timetrack", component: TimetrackComponent
      }, 
      {
        path: "payment", component: PaymentComponent
      },
      {
        path: "reports", component: ReportsComponent
      },
      {
        path: "**", redirectTo: "login"
      }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
