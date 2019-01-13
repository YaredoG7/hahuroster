import {Component} from "@angular/core"; 
import {Employee} from "../model/employee.model"; 
import {EmployeeRepository} from "../model/employee.repository";

@Component({
   selector: "employees", 
   templateUrl: "employees.component.html"
})
export class EmployeesComponent{
    constructor(private repository: EmployeeRepository){}

    get employees(): Employee[]{
      return this.repository.getEmployees(); 
    }

    get departments(): string []{
      return this.repository.getDepartment(); 
    }
}