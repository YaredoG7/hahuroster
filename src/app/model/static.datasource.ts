import {Injectable} from "@angular/core";
import {Observable, from} from "rxjs";
import {Employee} from "./employee.model"; 

@Injectable()
export class StaticDataSource {
    private employees: Employee[] = [
        { 
            id:1, empId:"Emp123", fullName: "Employee one", position: "Vice Manager", department: "IT", gender:"M", 
            dateOfBirth: new Date("1990-10-27"), homePhone: 12345, mobilePhone: 12345678, address:"Employee Address 1", 
            emailAddress: "test@test.com", emrContactName: "Company ABC", emrContactAddress: "Company Address", emrContactPhone:11212, 
            emrContactEmail: "", bankName:"", bankBranch:"", bankAccountNumber: null, employementType: "", grossPayment: 12000, 
            extraInfo:"", 

          }, 

          {
            id:1, empId:"Emp546", fullName: "Employee one", position: "Vice Manager", department: "IT", gender:"M", 
            dateOfBirth: new Date("1990-10-27"), homePhone: 12345, mobilePhone: 12345678, address:"Employee Address 1", 
            emailAddress: "test@test.com", emrContactName: "Company ABC", emrContactAddress: "Company Address", emrContactPhone:11212, 
            emrContactEmail: "", bankName:"", bankBranch:"", bankAccountNumber: null, employementType: "", grossPayment: 12000, 
            extraInfo:"", 
          }, 
          {
            id:1, empId:"Emp542", fullName: "Employee one", position: "Vice Manager", department: "IT", gender:"M", 
            dateOfBirth: new Date("1990-10-27"), homePhone: 12345, mobilePhone: 12345678, address:"Employee Address 1", 
            emailAddress: "test@test.com", emrContactName: "Company ABC", emrContactAddress: "Company Address", emrContactPhone:11212, 
            emrContactEmail: "", bankName:"", bankBranch:"", bankAccountNumber: null, employementType: "", grossPayment: 12000, 
            extraInfo:"", 
          }, 

    
    ]; 

    getEmployees(): Observable<Employee[]>{
        return from([this.employees]); 
    }
}