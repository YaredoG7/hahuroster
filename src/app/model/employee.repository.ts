import {Injectable} from "@angular/core";
//import {StaticDataSource} from "./static.datasource"; 
import {Employee} from "./employee.model"; 
import {RestDataSource} from "./rest.datasource"; 
import { TimeTrack } from '../model/timeTrack.model';

@Injectable()
export class EmployeeRepository {
    private employees: Employee[] = []; 
    private departments: string [] = [];
    private timetracks: TimeTrack[] = []; 
    timetrack: TimeTrack = new TimeTrack();  


    constructor(private dataSource: RestDataSource){
        dataSource.getEmployees().subscribe(data => {
            this.employees = data; 
            this.departments = data.map(em => em.department)
               .filter((c, index, array) => array.indexOf(c) == index).sort(); 
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
            this.dataSource.saveEmployee(employee).subscribe(p => this.employees.push(p));
            this.timetrack = new TimeTrack(employee.id, employee.empId)
            this.dataSource.registerTime(this.timetrack).subscribe(p => this.timetracks.push(p)); 
        } else {
            this.dataSource.updateEmployee(employee).subscribe(p => {
                 this.employees.splice(this.employees.findIndex(p => p.id == employee.id), 1, employee)
                })
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
        this.dataSource.deleteEmployee(id).subscribe(p => {
            this.employees.splice(this.employees.findIndex(p => p.id == id), 1);
        })
        this.dataSource.deleteTimeTrack(id).subscribe(tr => {
            this.timetracks.splice(this.timetracks.findIndex(tr => tr.id == id), 1);
        })
    }
}