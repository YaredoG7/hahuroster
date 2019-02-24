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
        path: "",
        redirectTo: '/login',
        pathMatch: 'full'

      }, 
      {
        path: "login",
        component: LoginComponent

      }, 
      {
        path: "dashboard",
        component: DashboardComponent,
        // canActivate: [AuthGuard], 
         children: [
         {
          path: "main",
          component: MainComponent,
          // canActivate: [AuthGuard],
         }, 
         {
          path: "employees", 
          component: EmployeesComponent, 
         // canActivate: [AuthGuard],
         }, 
         {
          path: "employees/:mode/:id", 
          component: EditEmployeeComponent, 
        //  canActivate: [AuthGuard],
        }, 
        {
          path: "employees/:mode", 
          component: EditEmployeeComponent
        },
        {
          path: "timetrack", 
          component: TimetrackComponent, 
        //  canActivate: [AuthGuard],
        }, 
        {
          path: "payment", 
          component: PaymentComponent, 
         // canActivate: [AuthGuard],
        },
        {
          path: "reports", 
          component: ReportsComponent, 
         // canActivate: [AuthGuard],
        }
       
       ]

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
