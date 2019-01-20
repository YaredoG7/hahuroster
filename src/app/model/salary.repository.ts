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
             console.log(data); 
         })
    }

    // save slaries
    saveSalary(salary: Salary): Observable<Salary>{
        console.log("I have been called..")
        return this.dataSource.saveSalary(salary);
    }

    getSalaries():Salary []{
      return this.slaries; 
    }
    
    // I will need a new payment model dedicated for the tax values to be added to it and then 
    
    addTotalTax(rate: number){
      
    }

    recalculate(){
      
    }

    netPay(){
     
    }

    clear(){
      
    }
}

