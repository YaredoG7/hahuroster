
import { Component } from '@angular/core';
import { Employee } from '../../model/employee.model';
import { EmployeeRepository } from '../../model/employee.repository';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
  selectedEmployee: Employee;
  display: string;

  constructor(private repository: EmployeeRepository) {
    this.selectedEmployee = new Employee(0);
    this.display = 'Employee name';
  }

  getEmployees(): Employee[] {
    return this.repository.getEmployees();
  }

  // get selected employee

  getSelectedEmp(emp: Employee) {
    this.selectedEmployee = emp;
  }

  deleteEmployee(empId: number) {
    this.repository.deleteEmployee(empId);
    this.selectedEmployee = new Employee(0);
  }

  getDepartment(): string[] {
    return this.repository.getDepartment();
  }
}
