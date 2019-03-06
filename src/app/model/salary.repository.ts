import { Injectable } from "@angular/core"; 
import {Employee} from "../model/employee.model"; 
import {Salary} from './salary.model'; 
import {RestDataSource} from "./rest.datasource"; 
import { Observable } from 'rxjs';

@Injectable()
export class SalaryRepository{

    private slaries: Salary [] = [];
    public employee: Employee; 

    constructor(private dataSource: RestDataSource){
         dataSource.getSalaries().subscribe(data => {
             this.slaries = data; 
         })
    }

    // save slaries
    saveSalary(salary: Salary): Observable<Salary>{
        return this.dataSource.saveSalary(salary);
    }

    getSalaries():Salary []{
      return this.slaries; 
    }
}

