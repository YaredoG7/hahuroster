import {Component} from "@angular/core"; 
import {Employee} from "../model/employee.model"; 
import {EmployeeRepository} from "../model/employee.repository";
import {AuthService} from "../model/auth.service"; 
import {Router} from "@angular/router"; 

@Component({
    selector: "dashboard", 
    templateUrl: "dashboard.component.html", 
    styleUrls: ["dashboard.component.css"]
})
export class DashboardComponent{
    

    constructor(private auth: AuthService,  private router: Router){ }
    
    checkLogin(): boolean{
      return this.auth.checkLogin();
    }

    logout(){
        this.auth.clear(); 
        this.router.navigateByUrl("/");
    }
   
}