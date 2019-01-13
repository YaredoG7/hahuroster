import { Injectable } from "@angular/core"; 
import {Employee} from "../model/employee.model"; 
import {Salary} from './salary.model'; 

@Injectable()
export class Payment{
    public taxRate: number [] = [];
    private slaries: Salary [] = [];
    public deduction: number = 0; 
    public employee: Employee; 

    // save slaries
    saveSlary(salary: Salary){
       this.slaries.push(salary); 
    }

    getSlary():Salary []{
      return this.slaries; 
    }
    
    // I will need a new payment model dedicated for the tax values to be added to it and then 
    
    addTotalTax(rate: number){
       this.taxRate.push(rate); 
       this.recalculate(); 
    }

    recalculate(){
       this.taxRate.forEach(tax =>{
           this.deduction +=( this.employee.grossPayment * tax)
       }
       )
    }

    netPay(){
        this.employee.grossPayment - this.deduction;
    }

    clear(){
        this.deduction = 0; 
        this.taxRate = []; 
    }
}

