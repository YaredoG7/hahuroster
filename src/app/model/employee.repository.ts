import {Injectable} from "@angular/core";
//import {StaticDataSource} from "./static.datasource"; 
import {Employee} from "./employee.model"; 
import {RestDataSource} from "./rest.datasource"; 
import { TimeTrack } from '../model/timeTrack.model';
import { NotificationService} from '../notification/notification.service';
import {Router} from "@angular/router"; 

@Injectable()
export class EmployeeRepository {
    private employees: Employee[] = []; 
    private departments: string [] = [];
    private timetracks: TimeTrack[] = []; 
    timetrack: TimeTrack = new TimeTrack();  


    constructor(private dataSource: RestDataSource, private notificationService: NotificationService, private router: Router){
        dataSource.getEmployees().subscribe((resp) => {
           this.employees = resp.body; 
           if(resp.status == 200){
          //  this.notificationService.success('All employees has been retrived')
           } }, error => {
            this.notificationService.error(error); 
         //   console.log(error); 
        });

        dataSource.getTimeTracks().subscribe(timetrack => {
            this.timetracks = timetrack; 
        })
    }

    // get all employees
    getEmployees(department: string = null): Employee[]{
        return this.employees
           .filter(em => department == null || department == em.department); 
    }

    getUsers(){
        return this.dataSource.getUsers();
    }
   
    // get employees by empId

    getEmployeeByEmpId(empId: string){
      return this.employees.find(emp => emp.empId == empId)
    }

  // get employees by ID -- which can be handy while editing and deleteing

    getEmployee(id:number){   
        return this.employees.find(em => em.id == id); 
    }
    getDepartment(): string[]{
        return this.departments; 
    }
   
    // update 
    saveEmployee(employee: Employee){
        if(employee.id == null || employee.id == 0){
            employee.id = this.generateID(); 
            this.dataSource.saveEmployee(employee).subscribe((resp) =>{
                this.employees.push(resp.body)
                    this.notificationService.success('መረጃዉ በተሳካ ሁኔታ ተመዝግቧል')
                    setTimeout(()=>{
                        this.router.navigateByUrl("/dashboard/employees"); 
                      }, 5000)
                     
            }, error => {
                this.notificationService.error(error);
                console.log("The whole response is " + error)
              //  console.log("Recieved error from back ..." + error.response)
            });  
            // register time track for registered employee 
            
            this.timetrack = new TimeTrack(employee.id, employee.empId, employee.fullName)
            this.dataSource.registerTime(this.timetrack).subscribe(p => this.timetracks.push(p)); 
            
        } else {
            this.dataSource.updateEmployee(employee).subscribe((resp) =>{
                this.employees.push(resp.body)
                    this.notificationService.success('መረጃዉ በተሳካ ሁኔታ ተስተካክሏል')
                    setTimeout(()=>{
                        this.router.navigateByUrl("/dashboard/employees"); 
                      }, 5000)
            }, error => {
                this.notificationService.error(error);
              //  console.log("Reached me..." + error)
            });
        }
    }

    // generate new ID

    private generateID(): number{
     let candidate = 1; 
     while(this.getEmployee(candidate) != null){
         candidate++; 
     }
      return candidate; 
    }

    deleteEmployee(id:number){
        this.dataSource.deleteEmployee(id).subscribe((resp) =>{
            this.notificationService.success('መረጃዉ ከዳታ ቤዝ ተሰርዝዋል')
            this.employees.splice(this.employees.findIndex(resp => resp.id == id), 1);
        }, error => {
            this.notificationService.error(error)
        })
        this.dataSource.deleteTimeTrack(id).subscribe(tr => {
            this.timetracks.splice(this.timetracks.findIndex(tr => tr.id == id), 1);
        })
    }
}