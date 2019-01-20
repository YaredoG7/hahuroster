import {Component} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";  
import {NgForm} from "@angular/forms"; 
import {Employee} from "../model/employee.model"; 
import {EmployeeRepository} from "../model/employee.repository"; 
import { TimeTrack } from '../model/timeTrack.model';
import {TimeTrackRepository} from "../model/timetrack.repository";
import { NotificationService} from '../notification/notification.service'; 

@Component({
    templateUrl: "editEmployee.component.html"
})
export class EditEmployeeComponent{
    editing: boolean = false; 
    employee: Employee = new Employee(); 
    timetrack: TimeTrack = new TimeTrack(); 
    formSubmitted: boolean = false; 

    constructor(private repository: EmployeeRepository, private timetrackRepo: TimeTrackRepository,
                private router: Router, activeRoute: ActivatedRoute, private notificationService: NotificationService){
                    this.editing = activeRoute.snapshot.params["mode"] == "edit";

                if(this.editing){
                Object.assign(this.employee, repository.getEmployee(activeRoute.snapshot.params["id"]));
                }
            }

            getValidationMessages(state: any, thingName?: string) {
                let thing: string = state.path || thingName;
                let messages: string[] = [];
                if (state.errors) {
                for (let errorName in state.errors) {
                switch (errorName) {
                case "required":
                messages.push(`You must enter a ${thing}`);
                break;
                case "minlength":
                messages.push(`A ${thing} must be at least
                ${state.errors['minlength'].requiredLength}
                characters`);
                break;
                case "pattern":
                messages.push(`The ${thing} contains
                illegal characters`);
                break;
                }
                }
                }
                return messages;
                }

                getFormValidationMessages(form: NgForm): string[] {
                    let messages: string[] = [];
                    Object.keys(form.controls).forEach(k => {
                        this.getValidationMessages(form.controls[k], k)
                    .forEach(m => messages.push(m));
                    });
                    return messages;
                }

            save(form: NgForm){
                this.formSubmitted = true; 
                if (form.valid){
                    this.timetrack = new TimeTrack(this.employee.id, this.employee.empId)
                    this.repository.saveEmployee(this.employee); 
                    form.reset(); 
                    this.formSubmitted = false;

                }
               
            }
}