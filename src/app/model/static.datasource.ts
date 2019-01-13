import {Injectable} from "@angular/core";
import {Observable, from} from "rxjs";
import {Employee} from "./employee.model"; 

@Injectable()
export class StaticDataSource {
    private employees: Employee[] = [
    
    ]; 

    getEmployess(): Observable<Employee[]>{
        return from([this.employees]); 
    }
}