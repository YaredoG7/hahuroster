import {Component} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";  
import {NgForm} from "@angular/forms"; 
import {Employee} from "../model/employee.model"; 
import {EmployeeRepository} from "../model/employee.repository"; 
import { TimeTrack } from '../model/timeTrack.model';
import {TimeTrackRepository} from "../model/timetrack.repository";

@Component({
    templateUrl: "editEmployee.component.html"
})
export class EditEmployeeComponent{
    editing: boolean = false; 
    employee: Employee = new Employee(); 
    timetrack: TimeTrack = new TimeTrack(); 

    constructor(private repository: EmployeeRepository, private timetrackRepo: TimeTrackRepository,
                private router: Router, activeRoute: ActivatedRoute){
                    this.editing = activeRoute.snapshot.params["mode"] == "edit";

                if(this.editing){
                Object.assign(this.employee, repository.getEmployee(activeRoute.snapshot.params["id"]));
                }
            }

            save(form: NgForm){
                this.timetrack = new TimeTrack(this.employee.id, this.employee.empId)
                this.repository.saveEmployee(this.employee); 
                console.log(this.employee)
                this.router.navigateByUrl("/employees"); 
            }
}